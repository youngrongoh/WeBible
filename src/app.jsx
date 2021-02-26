import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import ProfileEditForm from './components/profile_edit_form/profile_edit_form';
import Sidebar from './components/sidebar/sidebar';
import * as BIBLE_LIST from './data/bible_list.json';

const bibleList = BIBLE_LIST.default;

function App({ authService }) {
  const [records, setRecords] = useState({
    1: [1, 2, 5, 10],
    2: [1, 2, 3, 7],
    40: [5, 8],
    42: [2, 3, 5],
  });
  const [profile, setProfile] = useState({
    name: 'Rong',
    message: '안녕하세요 :)',
    goal: '신구약 1독',
    imageURL: null,
  });

  const getReadChapters = (bible, chapter, target) => {
    if (records[bible] === undefined) {
      return [target];
    }

    if (chapter) {
      return records[bible].filter((_chapter) => _chapter !== chapter);
    } else {
      const updated = [...records[bible]];
      updated.push(target);
      return updated;
    }
  };

  const updateReadList = (bible, chapter, text) => {
    setRecords((records) => {
      const updated = getReadChapters(bible, chapter, text);
      return { ...records, [bible]: updated };
    });
  };

  const editProfile = (profile) => {
    setProfile(profile);
  };

  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route path="/login">
            <Login authService={authService} />
          </Route>
          <Route path="/profile">
            <ProfileEditForm profile={profile} editProfile={editProfile} />
          </Route>
          <Route path="/" exact>
            <Dashboard
              authService={authService}
              bibleList={bibleList}
              records={records}
              updateReadList={updateReadList}
              profile={profile}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
