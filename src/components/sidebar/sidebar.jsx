import React, { memo } from 'react';
import Profile from '../profile/profile';
import styles from './sidebar.module.css';

const Sidebar = ({ profile }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <Profile profile={profile} />
      </div>
      <div className={styles.fixed}>
        <img className={styles.logo} src="images/logo.png" alt="logo" />
      </div>
    </aside>
  );
};

export default memo(Sidebar);
