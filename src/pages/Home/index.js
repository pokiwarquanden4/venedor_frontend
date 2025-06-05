import { useSelector } from 'react-redux';
import Category from './Category/Category';
import styles from './Home.module.scss';
import Inspires from './Inspires/Inspires';
import ProductList from './ProductList/ProductList';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const loginSelect = useSelector(LoginSelector);
  const navigate = useNavigate();

  if (loginSelect.loginRole === 'Admin') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <h1>Chào mừng Admin!</h1>
          <p>Đây là trang giới thiệu dành cho Admin. Tại đây bạn có thể quản lý hệ thống, người dùng và xem thống kê.</p>
          <button
            style={{
              marginTop: 24,
              padding: '12px 32px',
              background: 'rgb(13,60,85)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 18,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/admin')}
          >
            Đến trang quản trị
          </button>
        </div>
      </div>
    );
  }

  if (loginSelect.loginRole === 'Seller') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <h1>Chào mừng Người bán!</h1>
          <p>Đây là trang giới thiệu dành cho Người bán. Tại đây bạn có thể quản lý cửa hàng, xem thống kê và nhiều hơn nữa.</p>
          <button
            style={{
              marginTop: 24,
              padding: '12px 32px',
              background: 'rgb(13,60,85)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 18,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/accountSeller')}
          >
            Đến cửa hàng
          </button>
        </div>
      </div>
    );
  }

  if (loginSelect.loginRole === 'Shipper') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <h1>Chào mừng Nhân viên giao hàng!</h1>
          <p>Đây là trang giới thiệu dành cho Nhân viên giao hàng. Tại đây bạn có thể xem và quản lý đơn hàng giao.</p>
          <button
            style={{
              marginTop: 24,
              padding: '12px 32px',
              background: 'rgb(13,60,85)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 18,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/order')}
          >
            Đến quản lý giao hàng
          </button>
        </div>
      </div>
    );
  }

  if (loginSelect.loginRole === 'Stocker') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <h1>Chào mừng Nhân viên kho!</h1>
          <p>Đây là trang giới thiệu dành cho Nhân viên kho. Tại đây bạn có thể quản lý tồn kho và cập nhật hàng hóa.</p>
          <button
            style={{
              marginTop: 24,
              padding: '12px 32px',
              background: 'rgb(13,60,85)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 18,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/accountSeller')}
          >
            Đến quản lý tồn kho
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Fragment>
          <Inspires />
          <Category />
          <ProductList />
        </Fragment>
      </div>
    </div>
  );
}

export default Home;
