import React, { memo } from 'react';
import Profile from '../profile/profile';
import styles from './sidebar.module.css';

const Sidebar = ({ profile }) => {
  return (
    <aside className={styles.sidebar}>
      <Profile profile={profile} />
      <img className={styles.logo} src="images/logo.png" alt="logo" />
    </aside>
  );
};

export default memo(Sidebar);
