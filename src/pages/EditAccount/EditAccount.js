import styles from './EditAccount.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { useState } from 'react';
import { passwordFilter } from '../../config/filterInput';
import { createAccountActions } from '../../redux/actions/account/CreateAccountActions';
import { useDispatch, useSelector } from 'react-redux';
import { createAccountSelector } from '../../redux/selectors/accountSelector/CreateAccountSelector';

function EditAccount() {
  const dispatch = useDispatch();
  const accountSelect = useSelector(createAccountSelector);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNotification, setPasswordNotification] = useState();

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordNotification, setNewPasswordNotification] = useState();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>Edit Account</div>
          <div className={styles.sub_header}>Get in touch and let us know how we can help.</div>
        </div>
        <div className={styles.content}>
          <div className={styles.name}>
            <div className={styles.name_header}>Name</div>
            <input
              placeholder="Your Name"
              className={styles.name_input}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className={styles.password}>
            <div className={styles.password_header}>Password</div>
            <input
              type="password"
              value={password}
              placeholder="Your Password*"
              className={`${styles.password_input} ${passwordNotification ? styles.error : ''}`}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={() => {
                setPasswordNotification(false);
                dispatch(createAccountActions.setEditAccountWrongPassword(false));
              }}
              onBlur={() => {
                passwordFilter(password) || setPasswordNotification(true);
              }}
            ></input>
            {passwordNotification && (
              <div className={styles.notification}>Password need at least 10 character</div>
            )}
            {accountSelect.wrongPassword && (
              <div className={styles.notification}>Wrong password</div>
            )}
          </div>
          <div className={styles.password}>
            <div className={styles.password_header}>New Password</div>
            <input
              type="password"
              value={newPassword}
              placeholder="New Password*"
              className={`${styles.password_input} ${newPasswordNotification ? styles.error : ''}`}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              onFocus={() => {
                setNewPasswordNotification(false);
              }}
              onBlur={() => {
                passwordFilter(newPassword) || setNewPasswordNotification(true);
              }}
            ></input>
            {newPasswordNotification && (
              <div className={styles.notification}>Password need at least 10 character</div>
            )}
          </div>
        </div>
        <div className={styles.footer}>
          <MainButton
            onClick={() => {
              if (
                name &&
                password &&
                !passwordNotification &&
                newPassword &&
                !newPasswordNotification
              ) {
                dispatch(
                  createAccountActions.editAccountRequest({
                    name: name,
                    password: password,
                    newPassword: newPassword,
                  })
                );
              }
            }}
            className={styles.create_button}
            title="EDT ACCOUNT"
          ></MainButton>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
