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

  removeUserGroup(userId, groupId) {
    firebaseApp.database().ref(`users/${userId}/groups/${groupId}`).remove();
  }

  removeGroupUser(userId, groupId) {
    const ref = firebaseApp.database().ref(`groups/${groupId}`);
    ref.once('value', (snapshot) => {
      const group = snapshot.val();
      if (group.admin === userId) {
        this.removeGroup(groupId, group.users, ref);
        return;
      }
      const index = group.users.findIndex((id) => id === userId);
      firebaseApp.database().ref(`groups/${groupId}/users/${index}`).remove();
    });
  }

  async removeGroup(groupId, users, group) {
    users.forEach((id) => {
      firebaseApp.database().ref(`users/${id}/groups/${groupId}`).remove();
    });
    group.remove();
  }

  removeUser(userId) {
    firebaseApp.database().ref(`users/${userId}`).remove();
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
    const ref = firebaseApp.database().ref(`groups/${groupId}/users`);
    ref.on('value', async (snapshot) => {
      const ids = snapshot.val();
      const promiseArr = ids.map(async (id) => {
        const ref = firebaseApp.database().ref(`users/${id}`);
        return await ref.once('value').then((snapshot) => snapshot.val());
      });
      const usersArr = await Promise.all(promiseArr);
      const users = usersArr.reduce((acc, user, i) => {
        acc[ids[i]] = user;
        return acc;
      }, {});
      onUpdate && onUpdate(users);
    });
    return () => ref.off();
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
