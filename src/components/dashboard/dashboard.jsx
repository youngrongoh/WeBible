import React, { useEffect } from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import Sidebar from '../sidebar/sidebar';
import styles from './dashboard.module.css';
import { useHistory } from 'react-router-dom';

const Dashboard = ({
  authService,
  bibleList,
  records,
  updateReadList,
  profile,
}) => {
  const history = useHistory();

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (!user) {
        history.push('/login');
      }
    });
  });

  return (
    <>
      <Sidebar profile={profile} />
      <main className={styles.dashboard}>
        <div className={styles.user}>
          <RecordSheet
            user={false}
            bibleList={bibleList}
            records={records}
            updateReadList={updateReadList}
          />
        </div>
        <div className={styles.box}>
          <RecordSheet user={true} bibleList={bibleList} />
          <RecordSheet user={true} bibleList={bibleList} />
          <RecordSheet user={true} bibleList={bibleList} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
