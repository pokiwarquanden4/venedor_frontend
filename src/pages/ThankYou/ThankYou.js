import styles from './ThankYou.module.scss';
function ThankYou() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <header className={styles.header} id="header">
          <h1 className="site-header__title" data-lead-id="site-header-title">
            XIN CẢM ƠN!
          </h1>
        </header>
        <div className={styles.content}>
          <p className="main-content__body" data-lead-id="main-content-body">
            Cảm ơn bạn rất nhiều vì đã điền vào biểu mẫu. Điều đó có ý nghĩa lớn đối với chúng tôi, cũng giống như bạn vậy! Chúng tôi thực sự trân trọng khoảnh khắc bạn dành thời gian cho chúng tôi hôm nay. Cảm ơn vì bạn đã là chính mình.
          </p>
          <p className={styles.gmail} data-lead-id="main-content-body">
            Vui lòng kiểm tra Gmail của bạn để nhận thêm thông tin!!!
          </p>
        </div>

        <footer className={styles.footer} id="footer">
          <p className="site-footer__fineprint" id="fineprint">
            Bản quyền ©2014 | Mọi quyền được bảo lưu
          </p>
        </footer>
      </div>
    </div>
  );
}



export default ThankYou;
