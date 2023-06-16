import { Link } from 'react-router-dom';
import MainButton from '../MainButton/MainButton';
import styles from './LoginForm.module.scss';
import routes from '../../config/routes';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../redux/actions/account/LoginActions';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';

function LoginForm({ onClick }) {
  const dispatch = useDispatch();
  const selectMessage = useSelector(LoginSelector);
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const [forgetPassword, setForgetPassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{forgetPassword ? 'Forgot Your Password' : 'Login'}</div>
      <div className={styles.content}>
        <div className={styles.email}>
          <div className={styles.email_header}>Account</div>
          <input
            className={`${styles.email_input} ${
              selectMessage.loginError ? styles.errorMessage : ''
            }`}
            onFocus={() => {
              dispatch(loginActions.loginError(false));
            }}
            onChange={(e) => {
              setAccount(e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.password}>
          <div className={styles.password_header}>
            {forgetPassword ? 'Enter Your Otp' : 'Password'}
            {forgetPassword ? (
              <div
                className={styles.getOTP}
                onClick={() => {
                  dispatch(loginActions.createOtpRequest({ account: account }));
                }}
              >
                Send OTP to gmail
              </div>
            ) : undefined}
          </div>
          <input
            type="password"
            className={`${styles.password_input} ${
              selectMessage.loginError ? styles.errorMessage : ''
            }`}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <MainButton
          className={styles.confirm_button}
          title={forgetPassword ? 'GET YOUR PASSWORD' : 'SIGN IN'}
          onClick={() => {
            if (!forgetPassword) {
              dispatch(
                loginActions.loginRequest({
                  account: account,
                  password: password,
                })
              );
            } else {
              dispatch(
                loginActions.getPasswordRequest({
                  account: account,
                  otp: password,
                })
              );
            }
          }}
        ></MainButton>
      </div>
      <div className={styles.footer}>
        <Link to={routes.createAccount} onClick={onClick} className={styles.link}>
          <div className={styles.create_account}>Create Account</div>
        </Link>
        <div
          className={styles.forgot_password}
          onClick={() => {
            setForgetPassword(!forgetPassword);
          }}
        >
          {forgetPassword ? 'Sign in' : 'Forgot your password?'}{' '}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
