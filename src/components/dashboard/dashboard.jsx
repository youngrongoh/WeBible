import React from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import styles from './dashboard.module.css';

const Dashboard = (props) => {
  return (
    <main className={styles.dashboard}>
      <RecordSheet />
      <RecordSheet />
    </main>
  );
};

export default Dashboard;
