import React, { memo } from 'react';
import Profile from '../profile/profile';
import styles from './sidebar.module.css';

const Sidebar = ({ profile, groups }) => {
  console.log(groups);
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <Profile profile={profile} />
      </div>
      <div className={styles.group}>
        <h2 className={styles.title}>➤ 내가 속한 그룹</h2>
        <ul className={styles.list}>
          {groups.map((group) => (
            <li className={styles.item}>
              <button className={styles.button}># {group}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.fixed}>
        <img className={styles.logo} src="images/logo.png" alt="logo" />
      </div>
    </aside>
  );
};

export default memo(Sidebar);
