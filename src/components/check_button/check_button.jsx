import React from 'react';
import styles from './check_button.module.css';

const CheckButton = ({
  checkedChapter,
  bibleId,
  number,
  editable,
  updateReadList,
}) => {
  const readonlyStyle = editable ? '' : styles.readonly;

  const onClick = (event) => {
    if (!editable) {
      return;
    }
    const targetText = event.target.textContent;
    updateReadList(bibleId, checkedChapter, parseInt(targetText));
  };

  return (
    <button
      className={`${styles.button} ${getButtonStyle(
        checkedChapter
      )} ${readonlyStyle}`}
      onClick={onClick}
    >
      {number}
    </button>
  );
};

function getButtonStyle(chapter) {
  if (chapter) {
    return styles.checked;
  } else {
    return '';
  }
}

export default CheckButton;
