import { useCallback, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import ProfileEditForm from './components/profile_edit_form/profile_edit_form';
import * as BIBLE_LIST from './data/bible_list.json';

const bibleList = BIBLE_LIST.default;

function App({ authService, database }) {
  const [records, setRecords] = useState({
    1: [1, 2, 5, 10],
    2: [1, 2, 3, 7],
    40: [5, 8],
    42: [2, 3, 5],
  });
  const [profile, setProfile] = useState({});

  /* Update records state with a data passed by the clicked CheckButton.
  bible: ID of the bible which the button belongs.
  chapter: Chapter number of the button.
  text: textContent of the button.
   */
  const updateRecords = useCallback((onUpdate) => {
    setRecords(onUpdate);
  }, []);

  const editProfile = useCallback((profile) => {
    setProfile(profile);
  }, []);

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
              profile={profile}
              editProfile={editProfile}
            />
          </Route>
          <Route path="/" exact>
            <Dashboard
              authService={authService}
              database={database}
              bibleList={bibleList}
              records={records}
              updateRecords={updateRecords}
              profile={profile}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
