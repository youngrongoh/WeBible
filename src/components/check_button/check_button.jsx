import React, { memo } from 'react';
import styles from './check_button.module.css';

const CheckButton = ({
  checkedChapter,
  bibleId,
  number,
  editable,
  updateChapter,
}) => {
  const readonlyStyle = editable ? '' : styles.readonly;

  const onClick = (event) => {
    if (!editable) {
      return;
    }
    const targetText = event.target.textContent;
    updateChapter(bibleId, checkedChapter, parseInt(targetText));
  };

  return (
    <li className={styles.item}>
      <button
        className={`${styles.button} ${getButtonStyle(
          checkedChapter
        )} ${readonlyStyle}`}
        onClick={onClick}
      >
        {number}
      </button>
    </li>
  );
};

function getButtonStyle(chapter) {
  if (chapter) {
    return styles.checked;
  } else {
    return '';
  }
}

export default memo(CheckButton);
