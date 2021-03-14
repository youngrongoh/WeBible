import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './group_search.module.css';

const GroupSearch = ({ modal, database, changeModalStatus }) => {
  const location = useLocation();
  const [response, setResponse] = useState(null);
  const [result, setResult] = useState(null);
  const [value, setValue] = useState('');
  const formRef = useRef();
  const inputRef = useRef();

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

  const search = () => {
    if (!value || value === ' ') {
      setResult(null);
      return;
    }
    database.syncGroups(value, setResult);
  };

  const onSearchClick = (event) => {
    event.preventDefault();
    search();
    inputRef.current.focus();
  };

  const onKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();
    search();
  };

  const handleGroupClick = (group, id) => {
    location.state = { ...location.state, group, groupId: id };
    changeModalStatus('info');
  };

  useEffect(() => {
    if (modal !== 'search') {
      return;
    }
    inputRef.current.focus();
  }, [modal]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.add} onClick={() => changeModalStatus('add')}>
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
          <button className={styles.button} onClick={onSearchClick}>
            🔍
          </button>
        </form>
      </header>
      {value && result && (
        <ul className={styles.list}>
          {Object.keys(result).map((id) => (
            <li key={id} className={styles.item}>
              <button
                className={styles.link}
                onClick={() => handleGroupClick(result[id], id)}
              >
                <h1 className={styles.title}>{result[id].name}</h1>
                <span className={styles.member}>
                  <span className={styles.symbol}>👤</span>
                  {result[id].users.length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupSearch;
