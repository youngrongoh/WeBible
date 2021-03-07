import React, { memo } from 'react';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import GroupModal from '../group_modal/group_modal';
import Profile from '../profile/profile';
import styles from './sidebar.module.css';

const Sidebar = ({ database, profile, groups }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const path = pathname.replace('/modal', '');
  const _path = path === '/' ? '' : path;
  return (
    <>
      <Route path={`${_path}/modal`}>
        <GroupModal database={database} />
      </Route>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <Profile profile={profile} />
        </div>
        <div className={styles.group}>
          <h2 className={styles.title}>➤ 내가 속한 그룹</h2>
          <ul className={styles.list}>
            {Object.keys(groups).length !== 0 ? (
              Object.keys(groups).map((key) => (
                <li key={key} className={styles.item}>
                  <div className={styles.button}>
                    <Link to={`/group/${key}`}># {groups[key]}</Link>
                  </div>
                </li>
              ))
            ) : (
              <li className={styles.item}>
                <p className={styles.notice}>
                  ❗️ 아직 가입한 그룹이 없나요?
                  <br />
                  <span className={styles.point}>👇</span> 친구들과 함께
                  읽어보세요.
                </p>
              </li>
            )}
            <li className={styles.item}>
              <button
                className={styles.button}
                onClick={() => history.push(`${_path}/modal`)}
              >
                <span className={styles.symbol}>🔍</span> 찾아보기
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.fixed}>
          <img className={styles.logo} src="images/logo.png" alt="logo" />
        </div>
      </aside>
    </>
  );
};

export default memo(Sidebar);
