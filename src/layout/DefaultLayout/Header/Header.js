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
            <div className={styles.content}>Miễn phí giao hàng</div>
          </div>
          <div className={styles.items}>
            <LockIcon className={styles.lockIcon}></LockIcon>
            <div className={styles.content}>Thanh toán an toàn</div>
          </div>
          <div className={styles.items}>
            <ShareIcon className={styles.shareIcon}></ShareIcon>
            <div className={styles.content}>Đổi trả trong 30 ngày</div>
          </div>
          {/* <div className={styles.items}>
            <ContactIcon className={styles.contactIcon}></ContactIcon>
            <div className={styles.content}>Hỗ trợ khách hàng 24/7</div>
          </div> */}
        </div>
      </div>
      <HeaderFloating mainRef={mainRef}></HeaderFloating>
    </Fragment>
  );
}

export default Header;
