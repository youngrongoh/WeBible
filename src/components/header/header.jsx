import React, { memo } from 'react';
import styles from './header.module.css';

const Header = ({ title, member, onGoBack, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.back} onClick={onGoBack}></button>
        <h1 className={styles.title}>{title}</h1>
        {member && (
          <span className={styles.member}>
            <span className={styles.symbol}>👤</span>
            {member}
          </span>
        )}
      </div>
      {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
          로그아웃
        </button>
      )}
    </header>
  );
};

export default memo(Header);
