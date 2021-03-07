import React, { useEffect, useRef, useState } from 'react';
import styles from './group_modal.module.css';
import { Link, useHistory } from 'react-router-dom';

const GroupModal = ({ database }) => {
  const history = useHistory();
  const [response, setResponse] = useState(null);
  const [result, setResult] = useState(null);
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
    inputRef.current.focus();
    setValue('');
  };

  const onChange = (event) => {
    event.preventDefault();
    const keyword = inputRef.current.value;
    setValue(keyword);
    if (!value || value === ' ') {
      setResult(null);
      return;
    }
    if (value.length <= 2) {
      database.syncGroups(value, (res) => {
        setResponse(res);
        setResult(res);
      });
      return;
    }
    if (!response) return;
    const _result = {};
    Object.keys(response).forEach((id) => {
      const regex = new RegExp(`${keyword}`, 'i'); // display result slowly, if not use keyword but value.
      const name = response[id].name;
      if (regex.test(name)) {
        _result[id] = response[id];
      }
    });
    setResult(_result);
  };

  const onSearch = (event) => {
    event.preventDefault();
    if (!value || value === ' ') {
      setResult(null);
      return;
    }
    database.syncGroups(value, setResult);
  };

  const onKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    onSearch(event);
  };

  useEffect(() => inputRef.current.focus(), []);

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
                value={value}
                onKeyDown={onKeyDown}
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
        {value && result && (
          <ul className={styles.list}>
            {Object.keys(result).map((id) => (
              <li key={id} className={styles.item}>
                <Link to={`/group/${id}`} className={styles.link}>
                  <h1 className={styles.title}>{result[id].name}</h1>
                  <span className={styles.member}>
                    <span className={styles.symbol}>👤</span>
                    {result[id].users.length}
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
