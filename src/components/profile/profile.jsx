import React from 'react';
import Avatar from '../avatar/avatar';
import ProfileButton from '../profile_button/profile_button';
import styles from './profile.module.css';
const Profile = (props) => {
  return (
    <section className={styles.profile}>
      <Avatar />
      <ProfileButton />
      <p className={styles.message}>안녕하세요</p>
      <p className={styles.goal}>"신구약 1독"</p>
    </section>
  );
};

export default Profile;
