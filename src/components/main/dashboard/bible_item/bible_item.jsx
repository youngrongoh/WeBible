import React, { memo } from 'react';
import CheckButton from '../check_button/check_button';
import styles from './bible_item.module.css';

const BibleItem = ({ bible, editable, checkedChapters, updateChapter }) => {
  const renderButtons = () => {
    const result = [];
    for (let i = 0; i < bible.chapters; i++) {
      const checked = checkedChapters ? checkedChapters.includes(i + 1) : null;
      result.push(
        <CheckButton
          key={i}
          bibleId={bible.id}
          number={i + 1}
          checked={checked}
          updateChapter={updateChapter}
        />
      );
    }
    return result;
  };

  return (
    <li className={`${styles.item} ${!editable && styles.ineditable}`}>
      <p className={styles.name}>{bible.name}</p>
      <ol>{renderButtons()}</ol>
    </li>
  );
};

export default memo(BibleItem);
