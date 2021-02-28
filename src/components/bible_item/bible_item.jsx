import React from 'react';
import CheckButton from '../check_button/check_button';
import styles from './bible_item.module.css';

const BibleItem = ({ bible, checkedChapters, editable, updateChapter }) => {
  const renderButtons = () => {
    const result = [];
    for (let i = 0; i < bible.chapters; i++) {
      const checked = checkedChapters
        ? checkedChapters.find((chapter) => chapter === i + 1)
        : null;
      result.push(
        <CheckButton
          key={i}
          bibleId={bible.id}
          number={i + 1}
          checkedChapter={checked}
          editable={editable}
          updateChapter={updateChapter}
        />
      );
    }
    return result;
  };

  return (
    <li className={styles.item}>
      <p className={styles.name}>{bible.name}</p>
      <div>{renderButtons()}</div>
    </li>
  );
};

export default BibleItem;
