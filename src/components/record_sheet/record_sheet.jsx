import React from 'react';
import Avatar from '../avatar/avatar';
import ProfileButton from '../profile_button/profile_button';
import BibleItem from '../bible_item/bible_item';
import styles from './record_sheet.module.css';

const RecordSheet = ({ user, bibleList, records, updateReadList }) => {
  const renderItems = () =>
    Object.keys(bibleList).map((key) => {
      const bible = bibleList[key];
      const checkedChapters = records ? records[key] : null;
      return (
        <BibleItem
          key={key}
          bible={bible}
          checkedChapters={checkedChapters}
          editable={user ? false : true}
          updateReadList={updateReadList}
        />
      );
    });

  return (
    <section className={styles.sheet}>
      {user && (
        <div className={styles.profile}>
          <Avatar />
          <ProfileButton />
        </div>
      )}
      <ul className={styles.list}>{renderItems()}</ul>
    </section>
  );
};

export default RecordSheet;
