import React, { memo } from 'react';
import styles from './avatar.module.css';

const root = process.env.PUBLIC_URL;

const Avatar = memo(({ url }) => {
  return (
    <div className={styles.avatar}>
      <img
        className={styles.image}
        src={url || `${root}/images/default_avatar.png`}
        alt="avatar"
      />
    </div>
  );
});

export default Avatar;
