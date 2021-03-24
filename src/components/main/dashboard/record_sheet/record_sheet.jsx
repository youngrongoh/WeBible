import React from 'react';
import Avatar from '../../../profile/avatar/avatar';
import ProfileButton from '../../../profile/profile_button/profile_button';
import BibleItem from '../bible_item/bible_item';
import styles from './record_sheet.module.css';

const RecordSheet = ({ bibleList, profile, records, flex, updateChapter }) => {
  const renderItems = () =>
    Object.keys(bibleList).map((key) => {
      const bible = bibleList[key];
      const checkedChapters = records[key];
      return (
        <BibleItem
          key={key}
          bible={bible}
          editable={!profile ? true : false}
          checkedChapters={checkedChapters}
          updateChapter={updateChapter}
        />
      );
    });

  const onListClick = (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const bibleId = target.dataset.bibleId;
      const checked = target.dataset.checked;
      const text = parseInt(target.textContent);
      updateChapter(bibleId, checked === 'true', text);
    }
  };

  return (
    <section className={getStyle(flex, 'sheet')}>
      {profile && (
        <div className={styles.profile}>
          <Avatar url={profile.imageURL} />
          <ProfileButton name={profile.name} />
        </div>
      )}
      <div className={getStyle(!profile, 'container')}>
        <ol className={styles.list} onClick={(event) => !profile && onListClick(event)}>
          {renderItems()}
        </ol>
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
