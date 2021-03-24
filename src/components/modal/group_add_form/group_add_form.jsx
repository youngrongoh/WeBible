import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './group_add_form.module.css';

const root = process.env.PUBLIC_URL;

const GroupAddForm = ({ database, userId, changeModalStatus }) => {
  const [value, setValue] = useState('');
  const [reset, setReset] = useState(false);
  const history = useHistory();
  const inputRef = useRef();

  const onChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setValue(value);
    if (value) {
      setReset(true);
    } else {
      setReset(false);
    }
  };

  const onKeyPress = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();
  };

  const onReset = (event) => {
    event.preventDefault();
    setValue('');
    setReset(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!value || value === ' ') return;

    const groupId = Date.now().toString(32);
    const group = {
      name: value,
      admin: userId,
      users: [userId],
    };

    database.saveGroups(groupId, group);
    database.saveUserGroup(userId, groupId, value);
    changeModalStatus(null);
    history.push(`${root}/group/${groupId}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <button className={styles.back} onClick={() => changeModalStatus('search')}></button>
          <h1 className={styles.title}>새로운 그룹 만들기</h1>
        </div>
        <button className={styles.submit} onClick={onSubmit}>
          추가
        </button>
      </header>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="name">
          <span className={styles.name}>그룹 이름</span>
          <div className={styles.inputBox}>
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              name="name"
              id="name"
              value={value}
              onKeyPress={onKeyPress}
              onChange={onChange}
            />
            {reset && (
              <button className={styles.reset} onClick={onReset}>
                x
              </button>
            )}
          </div>
        </label>
      </form>
    </div>
  );
};

export default GroupAddForm;
