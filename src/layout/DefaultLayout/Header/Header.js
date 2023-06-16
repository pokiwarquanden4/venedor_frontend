import { Fragment } from 'react';
import { ContactIcon, LockIcon, ShareIcon, TruckIcon } from '../../../asset/img/HeaderIcon';
import HeaderFloating from '../HeaderFloating/HeaderFloating';
import styles from './Header.module.scss';
import { useRef } from 'react';
function Header() {
  const mainRef = useRef();

  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={styles.header_info}>
          <div className={styles.items}>
            <TruckIcon className={styles.truckIcon}></TruckIcon>
            <div className={styles.content}>Free Delivery</div>
          </div>
          <div className={styles.items}>
            <LockIcon className={styles.lockIcon}></LockIcon>
            <div className={styles.content}>Payment Secured</div>
          </div>
          <div className={styles.items}>
            <ShareIcon className={styles.shareIcon}></ShareIcon>
            <div className={styles.content}>30-Day Returns</div>
          </div>
          <div className={styles.items}>
            <ContactIcon className={styles.contactIcon}></ContactIcon>
            <div className={styles.content}>24/H Customer support</div>
          </div>
        </div>
      </div>
      <HeaderFloating mainRef={mainRef}></HeaderFloating>
    </Fragment>
  );
}

export default Header;
