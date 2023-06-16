import Footer from '../DefaultLayout/Footer/Footer';
import Header from '../DefaultLayout/Header/Header';
import styles from './HeaderOnly.module.scss';

function HeaderOnly({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header></Header>
      <div className={styles.body}>{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default HeaderOnly;
