import styles from './CreateAccount.module.scss';
import { useNavigate } from 'react-router-dom';
import MainButton from '../../components/MainButton/MainButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccountActions } from '../../redux/actions/account/CreateAccountActions';
import { loginActions } from '../../redux/actions/account/LoginActions';
import { createAccountSelector } from '../../redux/selectors/accountSelector/CreateAccountSelector';
import { emailFilter, passwordFilter } from '../../config/filterInput';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';

function CreateAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createAccount = useSelector(createAccountSelector);
  const loginSelect = useSelector(LoginSelector);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailNotification, setEmailNotification] = useState();
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNotification, setPasswordNotification] = useState();
  const [youAre, setYouAre] = useState('User');
  const [gender, setGender] = useState('Male')
  const [otp, setOtp] = useState('');
  const [otpEnable, setOtpEnable] = useState(false);
  const [otpNotification, setOtpNotification] = useState(false);

  useEffect(() => {
    if (createAccount.success) {
      dispatch(
        loginActions.loginRequest({
          account: accountName,
          password: password,
        })
      );
    }
  }, [accountName, createAccount.success, dispatch, password]);

  useEffect(() => {
    setOtpEnable(createAccount.createAccountOtp);
  }, [createAccount.createAccountOtp]);

  useEffect(() => {
    if (loginSelect.login) {
      dispatch(createAccountActions.setAccountSuccessStatus(false));
      navigate('/');
    }
  }, [dispatch, loginSelect.login, navigate]);

  useEffect(() => {
    setOtpNotification(createAccount.wrongOtp);
  }, [createAccount.wrongOtp]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>Create Account</div>
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
          <div className={styles.email}>
            <div className={styles.email_header}>Email</div>
            <input
              disabled={otpEnable}
              placeholder="Your Email"
              value={email}
              className={`${styles.email_input} ${emailNotification ? styles.error : ''}`}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={() => {
                dispatch(createAccountActions.setGmailExist(false));
                setEmailNotification(false);
              }}
              onBlur={() => {
                emailFilter(email) || setEmailNotification(true);
              }}
            ></input>
            {emailNotification && (
              <div className={styles.notification}>Email must end with @gmail.com</div>
            )}
            {createAccount.gmailExist && (
              <div className={styles.notification}>Email doesn't exist</div>
            )}
          </div>
          <div className={styles.accountName}>
            <div className={styles.accountName_header}>Account</div>
            <input
              disabled={otpEnable}
              placeholder="Your Account Name"
              className={styles.accountName_input}
              value={accountName}
              onChange={(e) => {
                setAccountName(e.target.value);
              }}
              onFocus={() => {
                dispatch(createAccountActions.setAccountExist(false));
              }}
            ></input>
            {createAccount.accountExist && (
              <div className={styles.notification}>Account Exist Please Use Another Name</div>
            )}
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
              }}
              onBlur={() => {
                passwordFilter(password) || setPasswordNotification(true);
              }}
            ></input>
            {passwordNotification && (
              <div className={styles.notification}>Password need at least 10 character</div>
            )}
          </div>
          <div className={styles.youAre}>
            <div className={styles.youAre_header}>You Are</div>
            <select
              className={styles.youAre_input}
              value={youAre}
              onChange={(e) => {
                setYouAre(e.target.value);
              }}
            >
              <option value="User">User</option>
              <option value="Seller">Seller</option>
            </select>
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
          {otpEnable ? (
            <div className={styles.otp}>
              <div className={styles.otp_header}>OTP</div>
              <input
                value={otp}
                placeholder="Your Otp*"
                className={`${styles.otp_input} ${otpNotification ? styles.error : ''}`}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                onFocus={() => {
                  dispatch(createAccountActions.setWrongOTP(false));
                }}
              ></input>
              {otpNotification && (
                <div className={styles.notification}>Otp is not valid or expired</div>
              )}
              <div
                className={styles.xButton}
                onClick={() => {
                  dispatch(createAccountActions.setCreateAccountOTP(false));
                }}
              >
                X
              </div>
            </div>
          ) : undefined}
        </div>
        <div className={styles.footer}>
          <MainButton
            onClick={() => {
              if (
                name &&
                email &&
                !emailNotification &&
                accountName &&
                password &&
                !passwordNotification &&
                youAre
              ) {
                if (otpEnable) {
                  dispatch(
                    createAccountActions.createAccountRequest({
                      name: name,
                      email: email,
                      gender: gender,
                      account: accountName,
                      password: password,
                      roleName: youAre,
                      otp: otp,
                    })
                  );
                } else {
                  dispatch(
                    createAccountActions.sendCreateAccountOTPRequest({
                      email: email,
                      account: accountName,
                    })
                  );
                }
              }
            }}
            className={styles.create_button}
            title={otpEnable ? 'CREATE ACCOUNT' : 'CONFIRM'}
          ></MainButton>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
