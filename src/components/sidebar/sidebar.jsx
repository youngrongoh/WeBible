import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = (props) => {
  return (
    <aside className={styles.sidebar}>
      <div>user</div>
      <img className={styles.logo} src="" alt="" />
    </aside>
  );
};

export default Sidebar;
