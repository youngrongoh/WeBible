import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../header/header';
import styles from './profile_add_form.module.css';

const ProfileAddForm = ({
  authService,
  database,
  imageUploader,
  changeModal,
}) => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const location = useLocation();
  const { userId } = location.state;
  const history = useHistory();

  const nameRef = useRef();
  const imgRef = useRef();

  const onNameChange = (event) => {
    event.preventDefault();
    const value = nameRef.current.value;
    setName(value);
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
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const onCancel = (event) => {
    event.preventDefault();
    authService.withdraw().then(() => {
      setName(null);
      setImage(null);
      setPreview(null);
      changeModal('login');
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let imageURL;
    if (image) {
      const result = await imageUploader.upload(image, userId);
      imageURL = result.url;
    } else {
      imageURL = null;
    }
    if (!name) {
      alert('이름을 입력해주세요');
      return;
    }
    database.saveUserData('profile', userId, { name, imageURL });
    history.push({ pathname: '/', state: { userId } });
  };

  return (
    <main className={styles.editor}>
      <Header title="프로필 변경" />
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.left}>
            <img
              className={styles.image}
              src={preview || 'images/default_avatar.png'}
              alt="preview"
            />
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
                value={name || ''}
                onChange={onNameChange}
              />
            </label>
            <div className={styles.buttons}>
              <button
                className={`${styles.button} ${styles.cancel}`}
                onClick={onCancel}
              >
                취소
              </button>
              <button
                className={`${styles.button} ${styles.submit}`}
                onClick={onSubmit}
              >
                가입하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProfileAddForm;
