import React, { useEffect, useState } from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import Sidebar from '../sidebar/sidebar';
import styles from './dashboard.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../header/header';

const Dashboard = ({
  authService,
  database,
  bibleList,
  profile,
  records,
  groups,
  group,
  getGroupId,
  updateRecords,
  editProfile,
}) => {
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});
  const history = useHistory();
  let { groupId } = useParams();

  // Return an array removed a chapter of the clicked or contain it.
  const getChapters = (bible, chapter, target) => {
    if (records[bible] === undefined) {
      return [target];
    }
    // remove or push the chapter.
    if (chapter) {
      return records[bible].filter((_chapter) => _chapter !== chapter);
    } else {
      const updated = [...records[bible]];
      updated.push(target);
      return updated;
    }
  };

  /* Update records state with a data passed by the clicked CheckButton.
   * bible: ID of the bible which the button belongs.
   * chapter: Chapter number of the button.
   * text: textContent of the button.
   */
  const updateChapter = (bible, chapter, target) => {
    const chapters = getChapters(bible, chapter, target);
    updateRecords((records) => {
      const updated = { ...records, [bible]: chapters };
      database.saveUserData('records', userId, updated);
      return updated;
    });
  };

  // Sync user data data when the user is logged in.
  useEffect(() => {
    if (!userId) {
      return;
    }
    setLoading(true);
    const stopSync = database.syncUserData('all', userId, (data) => {
      editProfile(data.profile);
      updateRecords(data.records);
    });
    setLoading(false);
    return () => stopSync();
  }, [database, updateRecords, editProfile, userId]);

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (!user) {
        history.push('/login');
        return;
      }
      setUserId(user.uid);
    });
  }, [authService, history, userId]);

  useEffect(() => {
    getGroupId && getGroupId(groupId);
    if (groupId) {
      const stopSync = database.syncGroupUsers(groupId, setUsers);
      return () => stopSync();
    }
  }, [groupId, getGroupId, database]);

  return (
    <>
      {loading && <div className={styles.loading}></div>}
      <Sidebar profile={profile} groups={groups} />
      <main className={styles.dashboard}>
        {group && (
          <Header title={`${group.name}`} member={group.users.length} />
        )}
        <div className={styles.container}>
          <RecordSheet
            bibleList={bibleList}
            records={records}
            flex={group ? false : true}
            updateChapter={updateChapter}
          />
          {group &&
            group.users.map(
              (userId) =>
                users.hasOwnProperty(userId) && (
                  <RecordSheet
                    key={userId}
                    userId={userId}
                    bibleList={bibleList}
                    profile={users[userId].profile}
                    records={users[userId].records}
                    flex={group ? false : true}
                    updateChapter={updateChapter}
                  />
                )
            )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
