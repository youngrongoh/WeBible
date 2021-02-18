import styles from './app.module.css';
import Dashboard from './components/dashboard/dashboard';
import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
