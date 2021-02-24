import React, { useRef, useState } from 'react';
import styles from './profile_edit_form.module.css';

const ProfileEditForm = ({ profile, editProfile }) => {
  const [preview, setPreview] = useState({ ...profile });

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

  const onCancelClick = (event) => {
    event.preventDefault();
  };

  const onEditClick = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const message = msgRef.current.value;
    const goal = goalRef.current.value;
    editProfile({ ...preview, name, message, goal });
  };

  const onImgBtnClick = (event) => {
    event.preventDefault();
    imgRef.current.click();
  };

  const onImageChange = (event) => {
    const file = imgRef.current.files[0];
    console.log(file);
  };

  return (
    <main className={styles.edit}>
      <h1 className={styles.title}>프로필 변경</h1>
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
              value={preview.name}
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
              value={preview.message}
              onChange={onChange}
            />
          </label>

          <div className={styles.label}>
            <span className={styles.name}>목표</span>
            <select
              ref={goalRef}
              className={styles.input}
              name="goal"
              value={preview.goal}
              onChange={onChange}
            >
              <option value="구약 1독">구약 1독</option>
              <option value="신약 1독">신약 1독</option>
              <option value="신구약 1독">신구약 1독</option>
            </select>
          </div>

          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.cancel}`}
              onClick={onCancelClick}
            >
              취소
            </button>
            <button
              className={`${styles.button} ${styles.edit}`}
              onClick={onEditClick}
            >
              수정
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default ProfileEditForm;
