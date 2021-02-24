import React from 'react';
import styles from './profile_button.module.css';

const ProfileButton = (props) => {
  const onProfileClick = () => {};

  return (
    <button className={styles.name} onClick={onProfileClick}>
      Rong
    </button>
  );
};

export default ProfileButton;
