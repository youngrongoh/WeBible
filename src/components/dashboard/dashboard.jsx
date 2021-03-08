import React, { useEffect, useState } from 'react';
import RecordSheet from '../record_sheet/record_sheet';
import styles from './dashboard.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../header/header';

const Dashboard = ({
  database,
  bibleList,
  userId,
  records,
  groups,
  updateRecords,
  changeLoadState,
}) => {
  const { groupId } = useParams();
  const history = useHistory();
  const [users, setUsers] = useState({});

  // Return an array removed a chapter of the clicked or contain it.
  const getChapters = (bible, chapter, target) => {
    if (records[bible] === undefined) {
      return [target];
    }
    // remove or push the chapter.
    if (chapter) {
      return records[bible].filter((_chapter) => _chapter !== chapter);
    } else {
      const updated = [...records[bible]];
      updated.push(target);
      return updated;
    }
  };

  /** Update records state with a data passed by the clicked CheckButton.
   * @params bible: ID of the bible which the button belongs.
   * @params chapter: Chapter number of the button.
   * @params target: the clicked button.
   */
  const updateChapter = (bibleId, chapter, target) => {
    const chapters = getChapters(bibleId, chapter, target);
    updateRecords((records) => {
      const updated = { ...records, [bibleId]: chapters };
      database.saveUserData('records', userId, updated);
      return updated;
    });
  };

  // Sync users data of a group when come in the group dashboard.
  useEffect(() => {
    if (groupId) {
      changeLoadState(true);
      const stopSync = database.syncGroupUsers(groupId, (users) => {
        setUsers(users);
        changeLoadState(false);
      });
      return () => stopSync();
    }
  }, [database, groupId, changeLoadState]);

  return (
    <>
      <main className={styles.dashboard}>
        {groupId && (
          <Header
            title={groups[groupId]}
            member={Object.keys(users).length}
            onGoBack={() => history.push('/')}
          />
        )}
        <div className={styles.container}>
          <RecordSheet
            bibleList={bibleList}
            records={records}
            flex={groupId ? false : true}
            updateChapter={updateChapter}
          />
          {Object.keys(users).length !== 0 &&
            Object.keys(users).map(
              (id) =>
                id !== userId && (
                  <RecordSheet
                    key={id}
                    bibleList={bibleList}
                    profile={users[id].profile}
                    records={users[id].records}
                    updateChapter={updateChapter}
                  />
                )
            )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
