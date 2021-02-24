import React from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import styles from './dashboard.module.css';

const Dashboard = ({ bibleList }) => {
  return (
    <main className={styles.dashboard}>
      <div className={styles.user}>
        <RecordSheet user={false} bibleList={bibleList} />
      </div>
      <div className={styles.box}>
        <RecordSheet user={true} bibleList={bibleList} />
        <RecordSheet user={true} bibleList={bibleList} />
        <RecordSheet user={true} bibleList={bibleList} />
      </div>
    </main>
  );
};

export default Dashboard;
