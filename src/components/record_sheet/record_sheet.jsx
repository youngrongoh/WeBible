import React from 'react';
import Avatar from '../avatar/avatar';
import ProfileButton from '../profile_button/profile_button';
import BibleItem from '../bible_item/bible_item';
import styles from './record_sheet.module.css';

const RecordSheet = ({ user, bibleList }) => {
  return (
    <section className={styles.sheet}>
      {user && (
        <div className={styles.profile}>
          <Avatar />
          <ProfileButton />
        </div>
      )}
      <ul className={styles.list}>
        {Object.values(bibleList).map((testament) => {
          return Object.keys(testament).map((key) => (
            <BibleItem key={key} bible={testament[key]} />
          ));
        })}
      </ul>
    </section>
  );
};

export default RecordSheet;
