import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styles from './group_info.module.css';

const GroupInfo = ({ database, userId, changeModalStatus }) => {
  const history = useHistory();
  const location = useLocation();
  const {
    state: { group, groupId },
  } = location;
  const [join, setJoin] = useState(false);

  const onClick = () => {
    const filtered = [...group.users, userId].filter((user) => Boolean(user));
    database.saveGroups(groupId, filtered, 'users');
    database.saveUserGroup(userId, groupId, group.name);
    history.push(`/group/${groupId}`);
    changeModalStatus(null);
  };

  useEffect(() => {
    if (!group.users.includes(userId)) {
      setJoin(true);
    }
  }, [group.users, userId]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.back}
          onClick={() => changeModalStatus('search')}
        ></button>
      </header>
      <section className={styles.body}>
        <div className={styles.info}>
          <div className={styles.title}>
            <h2 className={styles.name}>{group.name}</h2>
            <span className={styles.member}>
              <span className={styles.symbol}>👤</span>
              {group.users.length}
            </span>
          </div>
        </div>
        {join && (
          <button className={styles.join} onClick={onClick}>
            그룹에 참여하기
          </button>
        )}
      </section>
    </div>
  );
};

export default GroupInfo;
