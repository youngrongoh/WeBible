import firebaseApp from './firebase';

class Database {
  saveUserData(category, userId, data) {
    const validCategory = checkCategory(category);
    firebaseApp.database().ref(`users/${userId}/${validCategory}`).set(data);
  }

  saveUserGroup(userId, groupId, name) {
    firebaseApp.database().ref(`users/${userId}/groups/${groupId}`).set(name);
  }

  saveGroups(groupId, data, category) {
    firebaseApp
      .database()
      .ref(`groups/${groupId}/${category || ''}`)
      .set(data);
  }

  syncUserData(category, userId, onUpdate) {
    const validCategory = checkCategory(category);
    const ref = firebaseApp.database().ref(`users/${userId}/${validCategory}`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      onUpdate && onUpdate(value);
    });
    return () => ref.off();
  }

  syncGroupData(groupId, category, onUpdate) {
    const ref = firebaseApp.database().ref(`groups/${groupId}/${category}/`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      onUpdate && onUpdate(value);
    });
  }

  syncGroupUsers(groupId, onUpdate) {
    const ref = firebaseApp.database().ref('users');
    const conditionRef = ref.orderByChild('groups').startAt(groupId);
    conditionRef.on('value', (snapshot) => {
      const value = snapshot.val();
      onUpdate && onUpdate(value);
    });
    return () => conditionRef.off();
  }

  syncGroups(keyword, onUpdate) {
    const ref = firebaseApp.database().ref('groups');
    const conditionRef = ref
      .orderByChild('name')
      .startAt(keyword)
      .limitToFirst(10);
    conditionRef.once('value', (snapshot) => {
      const value = snapshot.val();
      onUpdate && onUpdate(value);
    });
  }
}

function checkCategory(value) {
  switch (value) {
    case 'profile':
    case 'records':
      return value;
    case 'all':
      return '';
    default:
      throw new Error(`invalid category: ${value}`);
  }
}

export default Database;
