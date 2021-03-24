import React from 'react';
import styles from './modal.module.css';
import GroupSearch from '../group_search/group_search';
import GroupAddForm from '../group_add_form/group_add_form';
import GroupEditForm from '../group_edit_form/group_edit_form';
import GroupDeleteForm from '../group_delete_form/group_delete_form';
import GroupInfo from '../group_info/group_info';
import UserDeleteForm from '../user_delete_form/user_delete_form';

const Modal = ({ authService, database, modal, userId, groups, changeModalStatus }) => {
  const onBGClick = (event) => {
    if (!event.target.matches(`.${styles.modal}`)) {
      return;
    }
    changeModalStatus(null);
  };

  return (
    <section className={styles.modal} onClick={onBGClick}>
      {modal === 'add' && (
        <GroupAddForm
          database={database}
          userId={userId}
          changeModalStatus={changeModalStatus}
        />
      )}
      {modal === 'search' && (
        <GroupSearch database={database} modal={modal} changeModalStatus={changeModalStatus} />
      )}
      {modal === 'setting' && (
        <GroupEditForm
          database={database}
          userId={userId}
          changeModalStatus={changeModalStatus}
        />
      )}
      {modal === 'delete' && (
        <GroupDeleteForm
          database={database}
          userId={userId}
          changeModalStatus={changeModalStatus}
        />
      )}
      {modal === 'info' && (
        <GroupInfo database={database} userId={userId} changeModalStatus={changeModalStatus} />
      )}
      {modal === 'withdraw' && (
        <UserDeleteForm
          authService={authService}
          database={database}
          userId={userId}
          groups={groups}
          changeModalStatus={changeModalStatus}
        />
      )}
    </section>
  );
};

export default Modal;
