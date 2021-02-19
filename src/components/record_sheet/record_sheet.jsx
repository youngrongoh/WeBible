import React from 'react';
import Profile from '../profile/profile';
import styles from './record_sheet.module.css';

const RecordSheet = (props) => {
  return (
    <section className={styles.sheet}>
      <div className={styles.profile}>
        <Profile />
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={styles.name}>Genesis</p>
          <form className={styles.form}>
            <button className={styles.button}>1</button>
            <button className={styles.button}>2</button>
            <button className={styles.button}>3</button>
          </form>
        </li>
        <li className={styles.item}>
          <p className={styles.name}>1 Corinthians</p>
          <form className={styles.form}>
            <button className={styles.button}>1</button>
            <button className={styles.button}>2</button>
            <button className={styles.button}>3</button>
          </form>
        </li>
      </ul>
    </section>
  );
};

export default RecordSheet;
