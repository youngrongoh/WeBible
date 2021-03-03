import { useCallback, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import ProfileEditForm from './components/profile_edit_form/profile_edit_form';
import * as BIBLE_LIST from './data/bible_list.json';

const bibleList = BIBLE_LIST.default;

function App({ authService, database, imageUploader }) {
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
  const [currentGroup, setCurrentGroup] = useState(null);

  const updateRecords = useCallback((records) => {
    setRecords(records);
  }, []);

  const editProfile = useCallback((profile) => {
    setProfile(profile);
  }, []);

  const getGroupId = (groupId) => {
    setCurrentGroup(groupId);
  };

  const onLogout = () => {
    authService.logout();
  };

  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route path="/login">
            <Login authService={authService} />
          </Route>
          <Route path="/profile">
            <ProfileEditForm
              authService={authService}
              database={database}
              imageUploader={imageUploader}
              profile={profile}
              groups={groups}
              onLogout={onLogout}
              editProfile={editProfile}
            />
          </Route>
          <Route path={`/group/:groupId`}>
            <Dashboard
              authService={authService}
              database={database}
              bibleList={bibleList}
              profile={profile}
              records={records}
              groups={groups}
              group={allGroups[currentGroup]}
              getGroupId={getGroupId}
              onLogout={onLogout}
              updateRecords={updateRecords}
              editProfile={editProfile}
            />
          </Route>
          <Route path="/" exact>
            <Dashboard
              authService={authService}
              database={database}
              bibleList={bibleList}
              profile={profile}
              records={records}
              groups={groups}
              updateRecords={updateRecords}
              editProfile={editProfile}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
