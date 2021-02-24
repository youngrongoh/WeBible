import styles from './app.module.css';
import Dashboard from './components/dashboard/dashboard';
import Sidebar from './components/sidebar/sidebar';
import * as BIBLE_LIST from './data/bible_list.json';

const bibleList = BIBLE_LIST.default;

function App() {
  const data = {
    '7jd82hf73hg63': {},
  };
  return (
    <div className={styles.app}>
      <Sidebar />
      <Dashboard bibleList={bibleList} />
    </div>
  );
}

export default App;
