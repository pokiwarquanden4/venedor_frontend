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

  if (loginSelect.loginRole === 'Seller') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <h1>Welcome Seller!</h1>
          <p>This is your seller introduction page. Here you can manage your shop, view statistics, and more.</p>
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
            Go to store
          </button>
        </div>
      </div>
    );
  }

  if (loginSelect.loginRole === 'Shipper') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <h1>Welcome Shipper!</h1>
          <p>This is your shipper introduction page. Here you can view and manage your delivery orders.</p>
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
            Go to delivery management
          </button>
        </div>
      </div>
    );
  }

  if (loginSelect.loginRole === 'Stocker') {
    return (
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <h1>Welcome Stocker!</h1>
          <p>This is your stocker introduction page. Here you can manage inventory and stock updates.</p>
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
            Go to inventory management
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