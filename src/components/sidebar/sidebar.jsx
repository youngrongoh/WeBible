import React from 'react';
import Profile from '../profile/profile';
import styles from './sidebar.module.css';

const Sidebar = (props) => {
  return (
    <aside className={styles.sidebar}>
      <Profile />
      <img className={styles.logo} src="images/logo.png" alt="logo" />
    </aside>
  );
};

export default Sidebar;
