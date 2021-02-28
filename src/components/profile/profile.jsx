import React, { memo } from 'react';
import Avatar from '../avatar/avatar';
import ProfileButton from '../profile_button/profile_button';
import styles from './profile.module.css';

const Profile = ({ profile }) => {
  return (
    <section className={styles.profile}>
      <Avatar url={profile.imageURL} />
      <ProfileButton name={profile.name} />
      <p className={styles.message}>{profile.message}</p>
      <p className={styles.goal}>"{profile.goal}"</p>
    </section>
  );
};

export default memo(Profile);
