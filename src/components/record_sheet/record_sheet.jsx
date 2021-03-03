import React, { useEffect, useState } from 'react';
import Avatar from '../avatar/avatar';
import ProfileButton from '../profile_button/profile_button';
import BibleItem from '../bible_item/bible_item';
import styles from './record_sheet.module.css';

const RecordSheet = ({
  userId,
  bibleList,
  profile,
  records,
  flex,
  updateChapter,
}) => {
  const renderItems = () =>
    Object.keys(bibleList).map((key) => {
      const bible = bibleList[key];
      const checkedChapters = records[key];
      return (
        <BibleItem
          key={key}
          bible={bible}
          checkedChapters={checkedChapters}
          editable={userId ? false : true}
          updateChapter={updateChapter}
        />
      );
    });

  return (
    <section className={getStyle(flex, 'sheet')}>
      {userId && (
        <div className={styles.profile}>
          <Avatar url={profile.imageURL} />
          <ProfileButton name={profile.name} />
        </div>
      )}
      <div className={getStyle(!userId, 'container')}>
        <ul className={styles.list}>{renderItems()}</ul>
      </div>
    </section>
  );
};

function getStyle(condition, name) {
  if (condition) {
    return styles[name];
  } else {
    return `${styles[name]} ${styles.group}`;
  }
}

export default RecordSheet;
