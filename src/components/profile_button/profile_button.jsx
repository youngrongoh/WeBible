import React from 'react';
import styles from './profile_button.module.css';

const ProfileButton = ({ name }) => {
  const onProfileClick = () => {};

  return (
    <button className={styles.name} onClick={onProfileClick}>
      {name}
    </button>
  );
};

export default ProfileButton;
