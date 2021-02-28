import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './profile_button.module.css';

const ProfileButton = memo(({ name }) => {
  const history = useHistory();

  const goToEdit = () => {
    history.push('/profile');
  };

  return (
    <button className={styles.name} onClick={goToEdit}>
      {name}
    </button>
  );
});

export default ProfileButton;
