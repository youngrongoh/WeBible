import firebaseApp from './firebase';

class Database {
  saveUserData(category, userId, data) {
    firebaseApp.database().ref(`users/${userId}/${category}`).set(data);
  }

  syncUserData(category, userId, onUpdate) {
    const ref = firebaseApp.database().ref(`users/${userId}/${category}`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      onUpdate && onUpdate(value);
    });
    return () => ref.off();
  }
}

export default Database;
