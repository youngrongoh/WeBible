import React, { memo } from 'react';
import styles from './check_button.module.css';

const CheckButton = ({ checked, bibleId, number }) => {
  return (
    <li className={styles.item}>
      <button
        className={`${styles.button} ${getButtonStyle(checked)}`}
        data-bible-id={bibleId}
        data-checked={checked}
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
