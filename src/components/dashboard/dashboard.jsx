import React, { useEffect, useState } from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import Sidebar from '../sidebar/sidebar';
import styles from './dashboard.module.css';
import { useHistory } from 'react-router-dom';

const Dashboard = ({
  authService,
  database,
  bibleList,
  records,
  updateRecords,
  profile,
}) => {
  const [userId, setUserId] = useState();
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

  const checkChapter = (bible, chapter, target) => {
    const chapters = getChapters(bible, chapter, target);
    updateRecords((records) => {
      const updated = { ...records, [bible]: chapters };
      database.saveUserData('records', userId, updated);
      return updated;
    });
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    database.syncUserData('records', userId, updateRecords);
  }, [userId, database, updateRecords]);

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (!user) {
        history.push('/login');
        return;
      }
      setUserId(user.uid);
    });
  });

  return (
    <>
      <Sidebar profile={profile} />
      <main className={styles.dashboard}>
        <RecordSheet
          users={false}
          bibleList={bibleList}
          records={records}
          checkChapter={checkChapter}
        />
      </main>
    </>
  );
};

export default Dashboard;
