import styles from './EditAccount.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { useCallback, useEffect, useState } from 'react';
import { encodePrice, passwordFilter } from '../../config/filterInput';
import { createAccountActions } from '../../redux/actions/account/CreateAccountActions';
import { useDispatch, useSelector } from 'react-redux';
import { createAccountSelector } from '../../redux/selectors/accountSelector/CreateAccountSelector';
import Popup from '../../components/Popup/Popup';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';
import { notificationActions } from '../../redux/actions/notification/notificationAction';
import { staffActions } from '../../redux/actions/account/StaffActions';
import { staffSelector } from '../../redux/selectors/accountSelector/StaffSelector';

function EditAccount() {
  const dispatch = useDispatch();
  const accountSelect = useSelector(createAccountSelector);
  const loginSelect = useSelector(LoginSelector);
  const staffSelect = useSelector(staffSelector)
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNotification, setPasswordNotification] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordNotification, setNewPasswordNotification] = useState();
  const [editPasswordPopup, setEditPasswordPopup] = useState(false);
  // ...existing imports...
  const [addStaffPopup, setAddStaffPopup] = useState(false);
  const [newStaff, setNewStaff] = useState({
    id: 0,
    name: '',
    phone: '',
    roleName: 0,
    salary: '',
    account: '',
    password: '',
  });

  const [staffAccounts, setStaffAccounts] = useState([]);

  useEffect(() => {
    dispatch(staffActions.getStaffRequest())
  }, [dispatch])

  useEffect(() => {
    if (!staffSelect.staffList) return
    setStaffAccounts(staffSelect.staffList)
  }, [staffSelect.staffList])

  const resetStaff = () => {
    setNewStaff({
      id: 0,
      name: '',
      phone: '',
      roleName: 0,
      salary: '',
      account: '',
      password: '',
    });
  }

  useEffect(() => {
    if (loginSelect.userData) {
      setName(loginSelect.userData.name);
      setGender(loginSelect.userData.gender)
    }
  }, [loginSelect.userData])

  const handleCreate = useCallback(() => {
    // Validate
    if (
      !newStaff.name ||
      !newStaff.phone ||
      !newStaff.roleName ||
      !newStaff.salary ||
      !newStaff.account ||
      !newStaff.password
    ) {
      dispatch(notificationActions.setNotificationContent('Vui lòng điền đầy đủ thông tin'));
      return;
    }

    dispatch(staffActions.createStaffRequest(newStaff))
    setAddStaffPopup(false);
    resetStaff()
  }, [dispatch, newStaff])

  const handleUpdate = useCallback(() => {
    // Validate
    if (
      !newStaff.name ||
      !newStaff.phone ||
      !newStaff.roleName ||
      !newStaff.salary ||
      !newStaff.account ||
      !newStaff.password
    ) {
      dispatch(notificationActions.setNotificationContent('Vui lòng điền đầy đủ thông tin'));
      return;
    }

    dispatch(staffActions.editStaffRequest(newStaff))
    setAddStaffPopup(false);
    resetStaff()
  }, [dispatch, newStaff])

  const handleDelete = useCallback((id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      dispatch(staffActions.deleteStaffRequest({
        id: id
      }));
      setAddStaffPopup(false);
      resetStaff();
    }
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.accountInfo_header}>
            <div className={styles.main_header}>Thông tin tài khoản</div>
            <div className={styles.sub_header}>Liên hệ với chúng tôi nếu bạn cần hỗ trợ.</div>
          </div>
          <div className={styles.staff_header}>
            <div className={styles.staff_header_title}>
              <div className={styles.main_header}>Danh sách nhân viên</div>
              <div className={styles.sub_header}>Quản lý các tài khoản nhân viên tại đây</div>
            </div>
            <MainButton
              onClick={() => {
                setAddStaffPopup(true)
              }}
              className={styles.add_staff_button}
              title="THÊM NHÂN VIÊN +"
            ></MainButton>
          </div>
        </div>
        <div className={styles.content}>
          {editPasswordPopup ? (
            <Popup
              width='600px'
              height='300px'
              onClick={() => {
                setEditPasswordPopup(false)
              }}
              highestZIndex={true}
            >
              <div className={styles.password_wrapper}>
                <h1 className={styles.passwordPopup_header}>Đổi mật khẩu</h1>
                <div className={styles.password}>
                  <div className={styles.password_header}>Mật khẩu hiện tại</div>
                  <input
                    type=""
                    value={password}
                    placeholder="Mật khẩu hiện tại*"
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
                    <div className={styles.notification}>Mật khẩu phải có ít nhất 10 ký tự</div>
                  )}
                  {accountSelect.wrongPassword && (
                    <div className={styles.notification}>Mật khẩu không đúng</div>
                  )}
                </div>
                <div className={styles.password}>
                  <div className={styles.password_header}>Mật khẩu mới</div>
                  <input
                    type="password"
                    value={newPassword}
                    placeholder="Mật khẩu mới*"
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
                    <div className={styles.notification}>Mật khẩu phải có ít nhất 10 ký tự</div>
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
                  title="XÁC NHẬN"
                ></MainButton>
              </div>
            </Popup>
          ) : undefined}
          {addStaffPopup ? (
            <Popup
              width='600px'
              height='auto'
              onClick={() => {
                setAddStaffPopup(false)
                resetStaff()
              }}
              highestZIndex={true}
            >
              <div className={styles.password_wrapper}>
                <h1 className={styles.passwordPopup_header}>Thêm nhân viên</h1>
                <div className={styles.password}>
                  <div className={styles.password_header}>Tên</div>
                  <input
                    value={newStaff.name}
                    placeholder="Tên nhân viên*"
                    className={styles.password_input}
                    onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
                  />
                </div>
                <div className={styles.password}>
                  <div className={styles.password_header}>Số điện thoại</div>
                  <input
                    value={newStaff.phone}
                    placeholder="Số điện thoại*"
                    className={styles.password_input}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setNewStaff({ ...newStaff, phone: value })
                    }}
                  />
                </div>
                <div className={styles.password}>
                  <div className={styles.password_header}>Chức vụ</div>
                  <select
                    className={styles.password_input}
                    value={newStaff.roleName}
                    onChange={e => setNewStaff({ ...newStaff, roleName: e.target.value })}
                  >
                    <option value={0}>Chọn...</option>
                    <option value="Stocker">Nhân viên kho</option>
                    <option value="Shipper">Người giao hàng</option>
                  </select>
                </div>
                <div className={styles.password}>
                  <div className={styles.password_header}>Lương</div>
                  <input
                    value={newStaff.salary}
                    placeholder="Lương hàng tháng*"
                    className={styles.password_input}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setNewStaff({ ...newStaff, salary: encodePrice(value) })
                    }}
                  />
                  <span className={styles.price_unit}>VND</span>
                </div>
                <div className={styles.password}>
                  <div className={styles.password_header}>Tên đăng nhập</div>
                  <input
                    value={newStaff.account}
                    placeholder="Tên đăng nhập*"
                    className={styles.password_input}
                    onChange={e => setNewStaff({ ...newStaff, account: e.target.value })}
                  />
                </div>
                <div className={styles.password}>
                  <div className={styles.password_header}>Mật khẩu</div>
                  <input
                    type="password"
                    value={newStaff.password}
                    placeholder="Mật khẩu*"
                    className={styles.password_input}
                    onChange={e => setNewStaff({ ...newStaff, password: e.target.value })}
                  />
                </div>
                <MainButton
                  onClick={() => {
                    if (newStaff.id) {
                      handleUpdate()
                    } else {
                      handleCreate()
                    }
                  }}
                  className={styles.update_password}
                  title="XÁC NHẬN"
                />
              </div>
            </Popup>
          ) : undefined}
          <div className={styles.contentStyle}>
            <div className={styles.userInfo}>
              <div className={styles.name}>
                <div className={styles.name_header}>Tên</div>
                <input
                  placeholder="Tên của bạn"
                  className={styles.name_input}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className={styles.gender}>
                <div className={styles.gender_header}>Giới tính</div>
                <select
                  className={styles.gender_input}
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
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
                  title="ĐỔI MẬT KHẨU"
                ></MainButton>
              </div>
            </div>
            <div className={styles.staffListWrapper}>
              <table className={styles.staffTable}>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
                    <th>Chức vụ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {staffAccounts.map((staff) => (
                    <tr key={staff.id}>
                      <td>{staff.name}</td>
                      <td>{staff.phone}</td>
                      <td>{staff.roleName}</td>
                      <td>
                        <button
                          className={styles.staffActionBtn}
                          onClick={() => {
                            setNewStaff({
                              id: staff.id,
                              name: staff.name,
                              phone: staff.phone,
                              roleName: staff.roleName,
                              salary: staff.salary,
                              account: staff.account,
                              password: staff.password,
                            });
                            setAddStaffPopup(true)
                          }}
                          style={{ marginRight: 8 }}
                        >
                          Cập nhật
                        </button>
                        <button
                          className={styles.staffActionBtn}
                          onClick={() => {
                            handleDelete(staff.id)
                          }}
                          style={{ color: 'red' }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
