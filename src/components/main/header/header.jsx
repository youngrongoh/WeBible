import React, { memo } from 'react';
import styles from './header.module.css';

const Header = ({ Button, title, member, onGoBack }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        {onGoBack && (
          <button className={styles.back} onClick={onGoBack}></button>
        )}
        <h1 className={styles.title}>{title}</h1>
        {member && (
          <span className={styles.member}>
            <span className={styles.symbol}>👤</span>
            {member}
          </span>
        )}
      </div>
      {Button && <Button className={styles.button} />}
    </header>
  );
};

export default memo(Header);
