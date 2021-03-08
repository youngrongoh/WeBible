import { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import styles from './app.module.css';
import Sidebar from './components/sidebar/sidebar';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import ProfileEditForm from './components/profile_edit_form/profile_edit_form';
import * as BIBLE_LIST from './data/bible_list.json';
import GroupModal from './components/group_modal/group_modal';

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
  // Personal User State
  const [userId, setUserId] = useState(null);
  const [records, setRecords] = useState({});
  const [profile, setProfile] = useState({});
  const [groups, setGroups] = useState({});

  // UI display status
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const [modal, setModal] = useState(false);

  const history = useHistory();
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

  const changeModalStatus = (status) => {
    setModal(status);
  };

  const onLogout = () => {
    authService.logout();
  };

  // Sync user data data when the user is logged in.
  useEffect(() => {
    if (!userId) {
      return;
    }
    setLoading(true);
    const stopSync = database.syncUserData('all', userId, (data) => {
      setProfile(data.profile);
      setRecords(data.records);
      setGroups(data.groups);
      setLoading(false);
    });
    return () => stopSync();
  }, [database, userId]);

  // Determine whether redirect to login according to auth state when auth change.
  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (!user) {
        history.push('/login');
        return;
      }
      setUserId(user.uid);
    });
  }, [authService, history, userId]);

  return (
    <>
      {loading && <div className={styles.loading}></div>}
      {modal && (
        <GroupModal database={database} changeModalStatus={changeModalStatus} />
      )}
      {sidebar && (
        <Sidebar
          profile={profile}
          groups={groups}
          changeModalStatus={changeModalStatus}
        />
      )}
      <Route path={`${_path}/profile`}>
        <ProfileEditForm
          authService={authService}
          database={database}
          imageUploader={imageUploader}
          userId={userId}
          profile={profile}
          onLogout={onLogout}
          editProfile={editProfile}
          changeLoadState={changeLoadState}
          changeSidebarShow={changeSidebarShow}
        />
      </Route>
      <Route path={['/', `${_path}/group/:groupId`]} exact>
        <Dashboard
          database={database}
          bibleList={bibleList}
          userId={userId}
          records={records}
          groups={groups}
          updateRecords={updateRecords}
          changeLoadState={changeLoadState}
        />
      </Route>
    </>
  );
}

export default App;
