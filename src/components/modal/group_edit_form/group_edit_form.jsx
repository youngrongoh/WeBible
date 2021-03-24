import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './group_edit_form.module.css';

const GroupEditForm = ({ database, userId, changeModalStatus }) => {
  const location = useLocation();
  const {
    state: { groupName, groupId },
  } = location;
  const [value, setValue] = useState(groupName);
  const [reset, setReset] = useState(groupName ? true : false);
  const [admin, setAdmin] = useState(false);
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
    setValue(groupName);
    if (groupName) {
      setReset(true);
    } else {
      setReset(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!value || value === ' ' || value === groupName) return;
    database.saveGroups(groupId, value, 'name');
    database.saveUserGroup(userId, groupId, value);
    changeModalStatus(null);
  };

  useEffect(() => {
    database.syncGroupData(groupId, 'admin', (adminId) => {
      if (adminId === userId) {
        setAdmin(true);
      }
    });
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <button
            className={styles.back}
            onClick={() => changeModalStatus(null)}
          ></button>
          <h1 className={styles.title}>그룹 설정</h1>
        </div>
        {admin && (
          <div>
            <button className={styles.button} onClick={onReset}>
              되돌리기
            </button>
            <button className={styles.button} onClick={onSubmit}>
              바꾸기
            </button>
          </div>
        )}
      </header>
      <section className={styles.body}>
        {admin && (
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
        )}
        <p className={styles.message}>
          {admin ? '현재 그룹을 삭제' : '현재 그룹에 참여를 중단'}하고 싶다면,
          <button
            className={styles.close}
            onClick={() => {
              location.state = { ...location.state, admin };
              changeModalStatus('delete');
            }}
          >
            여기
          </button>
          를 클릭
        </p>
      </section>
    </div>
  );
};

export default GroupEditForm;
