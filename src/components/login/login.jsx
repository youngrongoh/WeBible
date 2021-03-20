import React, { useCallback, useEffect, useState } from 'react';
import styles from './login.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import ProfileAddForm from '../profile_add_form/profile_add_form';

const root = process.env.PUBLIC_URL;

const Login = ({ authService, database, imageUploader }) => {
  const [modal, setModal] = useState('login');
  const location = useLocation();
  const history = useHistory();

  const onLogin = (provider) => {
    authService.login(provider).then((result) => {
      const userId = result.user.uid;
      database.syncUserData('profile', userId, (profile) => {
        if (profile) {
          history.push({ pathname: root, state: { userId } });
          return;
        }
        setModal('register');
        location.state = { userId };
      });
    });
  };

  const onProviderClick = (event) => {
    event.preventDefault();
    const providerName = event.target.dataset.provider;
    location.state = { providerName };
    const provider = authService.getProvider(providerName);
    onLogin(provider);
  };

  const changeModal = useCallback((kind) => {
    setModal(kind);
  }, []);

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (!user) return;
      const userId = user.uid;
      database.syncUserData('profile', userId, (profile) => {
        if (!profile) return;
        history.push({ pathname: root, state: { userId } });
      });
    });
  });

  return (
    <section className={styles.container}>
      {modal === 'register' && (
        <ProfileAddForm
          authService={authService}
          database={database}
          imageUploader={imageUploader}
          changeModal={changeModal}
        />
      )}
      {modal === 'login' && (
        <div className={styles.login}>
          <header className={styles.header}>
            <h1>Login</h1>
            <img className={styles.logo} src="images/logo.png" alt="logo" />
          </header>
          <form className={styles.form}>
            {/* <label className={styles.label} htmlFor="id">
              <span>ID</span>
              <input className={styles.input} type="text" name="id" id="id" />
            </label>
            <label className={styles.label} htmlFor="pw">
              <span>PW</span>
              <input className={styles.input} type="password" name="pw" id="pw" />
            </label>
            <div className={styles.signUp}>
              <span>아직 계정이 없다면, </span>
              <button className={styles.signUpBtn} onClick={() => setModal('register')}>
                가입하기
              </button>
            </div> */}
            <div className={styles.welcome}>
              <h2 className={styles.mention}>
                우리, 함께 읽는 성경, <span className={styles.title}>WeBible</span>
              </h2>
              <p className={styles.recommend}>구글 계정으로 지금, 시작하세요!</p>
            </div>
            <div className={styles.buttons}>
              {/* <button className={styles.loginBtn}>로그인</button> */}
              <button
                className={styles.button}
                data-provider="Google"
                onClick={onProviderClick}
              >
                Google 계정으로 로그인
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Login;
