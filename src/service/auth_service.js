import firebaseApp from './firebase';
import firebase from 'firebase/app';

class AuthService {
  getProvider(providerName) {
    return new firebase.auth[`${providerName}AuthProvider`]();
  }

  login(provider) {
    return firebaseApp.auth().signInWithPopup(provider);
  }

  logout() {
    firebaseApp.auth().signOut();
  }

  onAuthChanged(cb) {
    return firebaseApp.auth().onAuthStateChanged(cb);
  }
}

export default AuthService;
