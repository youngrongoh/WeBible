import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './user_delete_form.module.css';

const UserDeleteForm = ({
  authService,
  database,
  userId,
  groups,
  changeModalStatus,
}) => {
  const [value, setValue] = useState('');
  const {
    state: { name },
  } = useLocation();
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
    if (value !== name) {
      alert('그룹 이름을 정확히 입력해주세요.');
      return;
    }
    const groupIds = Object.keys(groups);
    if (groups || groupIds.length > 0) {
      groupIds.forEach((id) => {
        database.removeGroupUser(userId, id);
      });
    }
    database.removeUser(userId);
    authService.withdraw();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <button
            className={styles.back}
            onClick={() => changeModalStatus(null)}
          ></button>
          <h1 className={styles.title}>WeBible 계정 삭제</h1>
        </div>
        <button className={styles.button} onClick={onSubmit}>
          탈퇴
        </button>
      </header>
      <section className={styles.body}>
        <form className={styles.form}>
          <label className={styles.inputBox} htmlFor="name">
            <span className={styles.text}>
              WeBible에 등록된
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                name="name"
                id="name"
                value={value}
                placeholder={name}
                onKeyPress={onKeyPress}
                onChange={onChange}
              />
              계정과
            </span>
            <span className={styles.text}>
              데이터를 모두 삭제하는 것에 동의합니다.
            </span>
          </label>
          <p className={styles.message}>
            주의! 계정과 활동내역 은 복구되지 않습니다.
          </p>
        </form>
      </section>
    </div>
  );
};

export default UserDeleteForm;
