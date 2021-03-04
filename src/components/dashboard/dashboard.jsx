import React, { useEffect, useState } from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import styles from './dashboard.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../header/header';

const Dashboard = ({
  authService,
  database,
  bibleList,
  records,
  group,
  getGroupId,
  updateRecords,
  editProfile,
  changeLoadState,
}) => {
  const [userId, setUserId] = useState();
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

  /** Update records state with a data passed by the clicked CheckButton.
   * @params bible: ID of the bible which the button belongs.
   * @params chapter: Chapter number of the button.
   * @params target: the clicked button.
   */
  const updateChapter = (bibleId, chapter, target) => {
    const chapters = getChapters(bibleId, chapter, target);
    updateRecords((records) => {
      const updated = { ...records, [bibleId]: chapters };
      database.saveUserData('records', userId, updated);
      return updated;
    });
  };

  // Sync user data data when the user is logged in.
  useEffect(() => {
    if (!userId) {
      return;
    }
    changeLoadState(true);
    const stopSync = database.syncUserData('all', userId, (data) => {
      editProfile(data.profile);
      updateRecords(data.records);
      changeLoadState(false);
    });
    return () => stopSync();
  }, [database, userId, updateRecords, editProfile, changeLoadState]);

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (!user) {
        history.push('/login');
        return;
      }
      setUserId(user.uid);
    });
  }, [authService, history, userId]);

  // Sync users data of a group when come in the group dashboard.
  useEffect(() => {
    getGroupId && getGroupId(groupId);
    if (groupId) {
      changeLoadState(true);
      const stopSync = database.syncGroupUsers(groupId, (users) => {
        setUsers(users);
        changeLoadState(false);
      });
      return () => stopSync();
    }
  }, [database, groupId, getGroupId, changeLoadState]);

  return (
    <>
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
