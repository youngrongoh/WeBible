import React, { useEffect, useRef, useState } from 'react';
import styles from './group_modal.module.css';
import { Link, useHistory } from 'react-router-dom';

const GroupModal = (props) => {
  const history = useHistory();
  const [result, setResult] = useState(true);
  const [value, setValue] = useState('');
  const formRef = useRef();
  const inputRef = useRef();

  const onAddClick = () => {
    console.log('add');
  };

  const onBGClick = (event) => {
    if (!event.target.matches(`.${styles.modal}`)) {
      return;
    }
    history.goBack();
  };

  const onReset = (event) => {
    event.preventDefault();
    formRef.current.reset();
    setValue('');
  };

  const onChange = (event) => {
    event.preventDefault();
    setValue(inputRef.current.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    if (value.length <= 2) {
      console.log('too short');
      return;
    }
  };

  useEffect(() => inputRef.current.focus());

  return (
    <section className={styles.modal} onClick={onBGClick}>
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.add} onClick={onAddClick}>
            +
          </button>
          <form ref={formRef} className={styles.search}>
            <div className={styles.inputBox}>
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                onChange={onChange}
              />
              {value && (
                <button className={styles.reset} onClick={onReset}>
                  x
                </button>
              )}
            </div>
            <button className={styles.button} onClick={onSearch}>
              🔍
            </button>
          </form>
        </header>
        {result && (
          <ul className={styles.list}>
            {[1, 2, 3].map(() => (
              <li className={styles.item}>
                <Link to="/" className={styles.link}>
                  <h1 className={styles.title}>title</h1>
                  <span className={styles.member}>
                    <span className={styles.symbol}>👤</span>3
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default GroupModal;
