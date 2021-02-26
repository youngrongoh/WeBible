import React, { useEffect } from 'react';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';

const Login = ({ authService }) => {
  const history = useHistory();

  const onLogin = (provider) => {
    authService.login(provider).then((result) => {
      history.push({ pathname: '/', state: { id: result.user.uid } });
    });
  };

  const onProviderClick = (event) => {
    const providerName = event.target.dataset.provider;
    const provider = authService.getProvider(providerName);
    onLogin(provider);
  };

  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (user) {
        history.push({ pathname: '/', state: { id: user.uid } });
      }
    });
  });

  return (
    <section className={styles.container}>
      <div className={styles.login}>
        <header className={styles.header}>
          <h1>Login</h1>
        </header>
        <form className={styles.form}>
          <label className={styles.label} htmlFor="id">
            <span>ID</span>
            <input className={styles.input} type="text" name="id" id="id" />
          </label>
          <label className={styles.label} htmlFor="pw">
            <span>PW</span>
            <input className={styles.input} type="password" name="pw" id="pw" />
          </label>
          <div className={styles.signUp}>
            <span>아직 계정이 없다면, </span>
            <button className={styles.signUpBtn}>가입하기</button>
          </div>
          <button className={styles.loginBtn}>로그인</button>
        </form>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            data-provider="Google"
            onClick={onProviderClick}
          >
            Google 계정으로 로그인
          </button>
        </div>
      </div>
      <img className={styles.logo} src="images/logo.png" alt="logo" />
    </section>
  );
};

export default Login;
