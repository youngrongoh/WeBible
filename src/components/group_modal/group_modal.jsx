import React, { useEffect, useRef, useState } from 'react';
import styles from './group_modal.module.css';
import { Link } from 'react-router-dom';
import GroupAddForm from '../group_add_form/group_add_form';
import GroupEditForm from '../group_edit_form/group_edit_form';
import GroupDeleteForm from '../group_delete_form/group_delete_form';

const GroupModal = ({ database, modal, userId, changeModalStatus }) => {
  const [response, setResponse] = useState(null);
  const [result, setResult] = useState(null);
  const [value, setValue] = useState('');
  const formRef = useRef();
  const inputRef = useRef();

  const onBGClick = (event) => {
    if (!event.target.matches(`.${styles.modal}`)) {
      return;
    }
    changeModalStatus(null);
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

  useEffect(() => {
    if (modal !== 'search') {
      return;
    }
    inputRef.current.focus();
  }, [modal]);

  return (
    <section className={styles.modal} onClick={onBGClick}>
      {modal === 'add' && (
        <GroupAddForm
          database={database}
          userId={userId}
          changeModalStatus={changeModalStatus}
        />
      )}
      {modal === 'search' && (
        <div className={styles.container}>
          <header className={styles.header}>
            <button
              className={styles.add}
              onClick={() => changeModalStatus('add')}
            >
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
                  <Link
                    to={`/group/${id}`}
                    className={styles.link}
                    onClick={() => changeModalStatus(false)}
                  >
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
      )}
      {modal === 'setting' && (
        <GroupEditForm
          database={database}
          userId={userId}
          changeModalStatus={changeModalStatus}
        />
      )}
      {modal === 'delete' && (
        <GroupDeleteForm
          database={database}
          userId={userId}
          changeModalStatus={changeModalStatus}
        />
      )}
    </section>
  );
};

export default GroupModal;
