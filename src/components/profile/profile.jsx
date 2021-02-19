import React from 'react';
import styles from './profile.module.css';
const Profile = (props) => {
  const onProfileClick = () => {};

  return (
    <section className={styles.profile}>
      <div className={styles.avatar}>
        <img
          className={styles.image}
          src="images/default_avatar.png"
          alt="avatar"
        />
      </div>
      <button className={styles.name} onClick={onProfileClick}>
        Rong
      </button>
      <p className={styles.message}>안녕하세요</p>
      <p className={styles.goal}>"신구약 1독"</p>
    </section>
  );
};

export default Profile;
