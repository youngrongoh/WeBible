import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styles from './group_delete_form.module.css';

const GroupDeleteForm = ({ database, userId, changeModalStatus }) => {
  const {
    state: { admin, groupId, groupName },
  } = useLocation();
  const history = useHistory();
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const onChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setValue(value);
  };

  const onKeyPress = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (value !== groupName) {
      alert('그룹 이름을 정확히 입력해주세요.');
      return;
    }
    if (admin) {
      database.removeGroup(groupId);
    } else {
      database.removeUserGroup(userId, groupId);
      database.removeGroupUser(userId, groupId);
    }
    changeModalStatus(null);
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <button
            className={styles.back}
            onClick={() => changeModalStatus(null)}
          ></button>
          <h1 className={styles.title}>{admin ? '그룹 삭제' : '그룹 탈퇴'}</h1>
        </div>
        <button className={styles.button} onClick={onSubmit}>
          {admin ? '삭제' : '탈퇴'}
        </button>
      </header>
      <section className={styles.body}>
        <form className={styles.form}>
          <label className={styles.inputBox} htmlFor="name">
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              name="name"
              id="name"
              value={value}
              placeholder={groupName}
              onKeyPress={onKeyPress}
              onChange={onChange}
            />
            <span className={styles.text}>
              {admin ? '그룹을 영구히 삭제하는' : '그룹에서 탈퇴하는'} 것에
              동의합니다.
            </span>
          </label>
          <p className={styles.message}>
            주의! {admin ? '삭제된 그룹' : '그룹에서의 활동내역'}은 복구되지
            않습니다.
          </p>
        </form>
      </section>
    </div>
  );
};

export default GroupDeleteForm;
