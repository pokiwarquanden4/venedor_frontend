import styles from './ThankYou.module.scss';

function ThankYou() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <header className={styles.header} id="header">
          <h1 class="site-header__title" data-lead-id="site-header-title">
            THANK YOU!
          </h1>
        </header>
        <div className={styles.content}>
          <p class="main-content__body" data-lead-id="main-content-body">
            Thanks a bunch for filling that out. It means a lot to us, just like you do! We really
            appreciate you giving us a moment of your time today. Thanks for being you.
          </p>
          <p className={styles.gmail} data-lead-id="main-content-body">
            Please Check Your Gmail To Have More Information !!!
          </p>
        </div>

        <footer className={styles.footer} id="footer">
          <p class="site-footer__fineprint" id="fineprint">
            Copyright ©2014 | All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ThankYou;
