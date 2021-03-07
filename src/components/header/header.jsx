import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './header.module.css';

const Header = ({ title, member, onLogout }) => {
  const history = useHistory();
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.back} onClick={history.goBack}></button>
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
