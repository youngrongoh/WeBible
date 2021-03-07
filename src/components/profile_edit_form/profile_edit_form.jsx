import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../header/header';
import styles from './profile_edit_form.module.css';

const ProfileEditForm = ({
  authService,
  database,
  imageUploader,
  profile,
  onLogout,
  editProfile,
  changeLoadState,
  changeSidebarShow,
}) => {
  const [preview, setPreview] = useState({ ...profile });
  const [userId, setUserId] = useState();
  const [image, setImage] = useState();
  const history = useHistory();

  const nameRef = useRef();
  const msgRef = useRef();
  const goalRef = useRef();
  const imgRef = useRef();

  const url = preview.imageURL || '/images/default_avatar.png';

  const onChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setPreview({ ...preview, [name]: value });
  };

  const onReset = (event) => {
    event.preventDefault();
    setPreview(profile);
  };

  const onEditClick = async (event) => {
    event.preventDefault();
    changeLoadState(true);
    let imageURL;
    if (image) {
      const result = await imageUploader.upload(image, userId);
      imageURL = result.url;
    } else {
      imageURL = profile.imageURL;
    }

    const updated = { ...preview, imageURL };
    editProfile(updated);
    database.saveUserData('profile', userId, updated);
    changeLoadState(false);
  };

  const onImgBtnClick = (event) => {
    event.preventDefault();
    imgRef.current.click();
  };

  const onImageChange = () => {
    const file = imgRef.current.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview({ ...preview, imageURL: event.target.result });
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  // Sync profile data if userId be present.
  useEffect(() => {
    if (!userId) {
      return;
    }
    changeLoadState(true);
    const stopSync = database.syncUserData('profile', userId, (profile) => {
      editProfile(profile);
      setPreview(profile);
      changeLoadState(false);
    });
    return () => stopSync();
  }, [userId, database, editProfile, changeLoadState]);

  // Determine whether redirect to login according to auth state when auth change.
  useEffect(() => {
    authService.onAuthChanged((user) => {
      if (user == null) {
        history.push('/login');
        return;
      }
      setUserId(user.uid);
    });
  });

  // Change the show state of sidebar in accordance whether mount or unmount this.
  useEffect(() => {
    changeSidebarShow(false);
    return () => changeSidebarShow(true);
  }, [changeSidebarShow]);

  return (
    <main className={styles.editor}>
      <Header
        Button={({ className }) => (
          <button className={className} onClick={onLogout}>
            로그아웃
          </button>
        )}
        title="프로필 변경"
        onGoBack={history.goBack}
      />
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.left}>
            <img className={styles.image} src={url} alt="preview" />
            <button className={styles.imageButton} onClick={onImgBtnClick}>
              이미지 변경
            </button>
            <input
              ref={imgRef}
              className={styles.imputFile}
              type="file"
              accept="image/*"
              name="image"
              onChange={onImageChange}
            />
          </div>
          <div className={styles.right}>
            <label htmlFor="name" className={styles.label}>
              <span className={styles.name}>이름</span>
              <input
                ref={nameRef}
                className={styles.input}
                type="text"
                name="name"
                id="name"
                value={preview.name || ''}
                onChange={onChange}
              />
            </label>

            <label htmlFor="message" className={styles.label}>
              <span className={styles.name}>상태메세지</span>
              <input
                ref={msgRef}
                className={styles.input}
                type="text"
                name="message"
                id="message"
                value={preview.message || ''}
                onChange={onChange}
              />
            </label>

            <div className={styles.label}>
              <span className={styles.name}>목표</span>
              <select
                ref={goalRef}
                className={styles.goal}
                name="goal"
                value={preview.goal || ''}
                onChange={onChange}
              >
                <option value="구약 1독">구약 1독</option>
                <option value="신약 1독">신약 1독</option>
                <option value="신구약 1독">신구약 1독</option>
              </select>
            </div>
            <div className={styles.buttons}>
              <button
                className={`${styles.button} ${styles.reset}`}
                onClick={onReset}
              >
                되돌리기
              </button>
              <button
                className={`${styles.button} ${styles.edit}`}
                onClick={onEditClick}
              >
                바꾸기
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProfileEditForm;
