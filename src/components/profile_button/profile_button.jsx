import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './profile_button.module.css';

const root = process.env.PUBLIC_URL;

const ProfileButton = memo(({ name }) => {
  const history = useHistory();

  const goToEdit = () => {
    history.push(`${root}/profile`);
  };

  return (
    <button className={styles.name} onClick={goToEdit}>
      {name}
    </button>
  );
});

export default ProfileButton;
