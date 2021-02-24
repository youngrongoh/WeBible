import { useState } from 'react';
import styles from './app.module.css';
import Dashboard from './components/dashboard/dashboard';
import Sidebar from './components/sidebar/sidebar';
import * as BIBLE_LIST from './data/bible_list.json';

const bibleList = BIBLE_LIST.default;

function App() {
  const [records, setRecords] = useState({
    1: [1, 2, 5, 10],
    2: [1, 2, 3, 7],
    40: [5, 8],
    42: [2, 3, 5],
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

  return (
    <div className={styles.app}>
      <Sidebar />
      <Dashboard
        bibleList={bibleList}
        records={records}
        updateReadList={updateReadList}
      />
    </div>
  );
}

export default App;
