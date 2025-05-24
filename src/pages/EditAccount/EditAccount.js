import styles from './EditAccount.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { useEffect, useState } from 'react';
import { passwordFilter } from '../../config/filterInput';
import { createAccountActions } from '../../redux/actions/account/CreateAccountActions';
import { useDispatch, useSelector } from 'react-redux';
import { createAccountSelector } from '../../redux/selectors/accountSelector/CreateAccountSelector';
import Popup from '../../components/Popup/Popup';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';

function EditAccount() {
  const dispatch = useDispatch();
  const accountSelect = useSelector(createAccountSelector);
  const loginSelect = useSelector(LoginSelector);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNotification, setPasswordNotification] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordNotification, setNewPasswordNotification] = useState();
  const [editPasswordPopup, setEditPasswordPopup] = useState(false);

  useEffect(() => {
    if (loginSelect.userData) {
      setName(loginSelect.userData.name);
      setGender(loginSelect.userData.gender)
    }
  }, [loginSelect.userData])

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>Your Account Info</div>
          <div className={styles.sub_header}>Get in touch and let us know how we can help.</div>
        </div>
        <div className={styles.content}>
          {editPasswordPopup ? (
            <Popup
              width='600px'
              height='270px'
              onClick={() => {
                setEditPasswordPopup(false)
              }}
              highestZIndex={true}
            >
              <div className={styles.password_wrapper}>
                <h1 className={styles.passwordPopup_header}>Password</h1>
                <div className={styles.password}>
                  <div className={styles.password_header}>Password</div>
                  <input
                    type=""
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
                <MainButton
                  onClick={() => {
                    dispatch(
                      createAccountActions.updatePasswordRequest({
                        password: password,
                        newPassword: newPassword,
                      })
                    );
                  }}
                  className={styles.update_password}
                  title="CONFIRM"
                ></MainButton>
              </div>
            </Popup>
          ) : undefined}

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
          <div className={styles.gender}>
            <div className={styles.gender_header}>Gender</div>
            <select
              className={styles.gender_input}
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className={styles.footer}>
          <MainButton
            onClick={() => {
              if (
                name &&
                gender
              ) {
                dispatch(
                  createAccountActions.editAccountRequest({
                    name: name,
                    gender: gender,
                  })
                );
              }
            }}
            className={styles.edit_button}
            title="SAVE"
          ></MainButton>
          <MainButton
            onClick={() => {
              setEditPasswordPopup(true);
            }}
            className={styles.editPassword_button}
            title="EDIT PASSWORD"
          ></MainButton>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
