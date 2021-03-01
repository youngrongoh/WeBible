import React, { useEffect, useState } from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import Sidebar from '../sidebar/sidebar';
import styles from './dashboard.module.css';
import { useHistory } from 'react-router-dom';

const Dashboard = ({
  authService,
  database,
  bibleList,
  profile,
  records,
  updateRecords,
  editProfile,
}) => {
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
    const stopSync = database.syncUserData('', userId, (data) => {
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

  return (
    <>
      {loading && <div className={styles.loading}></div>}
      <Sidebar profile={profile} />
      <main className={styles.dashboard}>
        <RecordSheet
          users={false}
          bibleList={bibleList}
          records={records}
          updateChapter={updateChapter}
        />
      </main>
    </>
  );
};

export default Dashboard;
