import React from 'react';
import styles from './bible_item.module.css';

const BibleItem = ({ bible }) => {
  const renderButtons = () => {
    const result = [];
    for (let i = 0; i < bible.chapter; i++) {
      result.push(
        <button key={i} className={styles.button}>
          {i + 1}
        </button>
      );
    }
    return result;
  };

  return (
    <li className={styles.item}>
      <p className={styles.name}>{bible.name}</p>
      <form className={styles.form}>{renderButtons()}</form>
    </li>
  );
};

export default BibleItem;
