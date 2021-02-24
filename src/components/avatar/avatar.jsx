import React from 'react';
import styles from './avatar.module.css';

const Avatar = (props) => {
  return (
    <div className={styles.avatar}>
      <img
        className={styles.image}
        src="images/default_avatar.png"
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
