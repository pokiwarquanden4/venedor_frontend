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
      <div className={styles.header}>{forgetPassword ? 'Quên mật khẩu' : 'Đăng nhập'}</div>
      <div className={styles.content}>
        <div className={styles.email}>
          <div className={styles.email_header}>Tài khoản</div>
          <input
            className={`${styles.email_input} ${selectMessage.loginError ? styles.errorMessage : ''
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
            {forgetPassword ? 'Nhập mã OTP' : 'Mật khẩu'}
            {forgetPassword ? (
              <div
                className={styles.getOTP}
                onClick={() => {
                  dispatch(loginActions.createOtpRequest({ account: account }));
                }}
              >
                Gửi OTP tới email
              </div>
            ) : undefined}
          </div>
          <input
            type="password"
            className={`${styles.password_input} ${selectMessage.loginError ? styles.errorMessage : ''
              }`}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <MainButton
          className={styles.confirm_button}
          title={forgetPassword ? 'LẤY MẬT KHẨU' : 'ĐĂNG NHẬP'}
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
          <div className={styles.create_account}>Tạo tài khoản</div>
        </Link>
        <div
          className={styles.forgot_password}
          onClick={() => {
            setForgetPassword(!forgetPassword);
          }}
        >
          {forgetPassword ? 'Đăng nhập' : 'Quên mật khẩu?'}{' '}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
