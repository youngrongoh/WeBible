import React from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import styles from './dashboard.module.css';

const Dashboard = (props) => {
  return (
    <main className={styles.dashboard}>
      <div className={styles.user}>
        <RecordSheet />
      </div>
      <div className={styles.box}>
        <RecordSheet />
        <RecordSheet />
        <RecordSheet />
      </div>
    </main>
  );
};

export default Dashboard;
