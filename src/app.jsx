import { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import styles from './app.module.css';
import Sidebar from './components/sidebar/sidebar';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import ProfileEditForm from './components/profile_edit_form/profile_edit_form';
import * as BIBLE_LIST from './data/bible_list.json';

const bibleList = BIBLE_LIST.default;

function App({ authService, database, imageUploader }) {
  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route path="/login">
            <Login authService={authService} />
          </Route>
          <Route path="/">
            <NestedRoute
              authService={authService}
              database={database}
              imageUploader={imageUploader}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function NestedRoute({ authService, database, imageUploader }) {
  const [records, setRecords] = useState({});
  const [profile, setProfile] = useState({});
  const [groups, setGroups] = useState({
    kj34h53kj6: 'Happy friends',
    jk45h23k: 'Lovely church',
  });
  const [allGroups, setAllGroups] = useState({
    kj34h53kj6: {
      name: 'Happy friends',
      users: ['NIzO64MSicfd8xKNMFC3NYHmqFn1'],
    },
    jk45h23k: {
      name: 'Lovely church',
      users: ['Bob', 'Jane'],
    },
  });
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const { path } = useRouteMatch();
  const _path = path === '/' ? '' : path;

  const updateRecords = useCallback((records) => {
    setRecords(records);
  }, []);

  const editProfile = useCallback((profile) => {
    setProfile(profile);
  }, []);
  const changeLoadState = useCallback((loadState) => {
    setLoading(loadState);
  }, []);

  const changeSidebarShow = useCallback((visible) => {
    setSidebar(visible);
    return visible;
  }, []);

  const onLogout = () => {
    authService.logout();
  };

  return (
    <>
      {loading && <div className={styles.loading}></div>}
      {sidebar && <Sidebar profile={profile} groups={groups} path={_path} />}
      <Route path={`${_path}/profile`}>
        <ProfileEditForm
          authService={authService}
          database={database}
          imageUploader={imageUploader}
          profile={profile}
          onLogout={onLogout}
          editProfile={editProfile}
          changeLoadState={changeLoadState}
          changeSidebarShow={changeSidebarShow}
        />
      </Route>
      <Route
        path={[
          '/',
          '/modal',
          `${_path}/group/:groupId`,
          `${_path}/group/:groupId/modal`,
        ]}
        exact
      >
        <Dashboard
          authService={authService}
          database={database}
          bibleList={bibleList}
          records={records}
          updateRecords={updateRecords}
          editProfile={editProfile}
          changeLoadState={changeLoadState}
        />
      </Route>
    </>
  );
}

export default App;
