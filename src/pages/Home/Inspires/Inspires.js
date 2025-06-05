import styles from './Inspires.module.scss';

function Inspires() {
  return (
    <div className={styles.inspires}>
      <div className={styles.inspires_grid}>
        <div className={styles.inspires_content}>
          <div className={styles.shadow_background}></div>
          <img
            alt=''
            className={styles.picture}
            src="https://baogiaothong.mediacdn.vn/upload/1-2022/images/2022-01-20/Khung-canh-tuyet-trang-tuyet-dep-tren-ngon-nui-noi-tieng-nhat-Trung-Quoc-2-1642657690-555-width650height433.jpg"
          />
          <div className={styles.content_wrapper}>
            <div className={styles.content_sub}>Hiểu bạn nhất</div>
            <div className={styles.content_header}>Giao diện người dùng thông minh</div>
          </div>
        </div>

        <div className={styles.inspires_content}>
          <div className={styles.shadow_background}></div>
          <img
            alt=''
            className={styles.picture}
            src="https://dulichviet.com.vn/images/bandidau/danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi.jpg"
          />
          <div className={styles.content_wrapper}>
            <div className={styles.content_sub}>Trải nghiệm toàn cảnh</div>
            <div className={styles.content_header}>Sức mạnh khiến bạn rung động</div>
          </div>
        </div>

        <div className={styles.inspires_content}>
          <div className={styles.shadow_background}></div>
          <img
            alt=''
            className={styles.picture}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Nji70n0nKnujZh_As_Klbd6AKI9a9vl4Ag&usqp=CAU"
          />
          <div className={styles.content_wrapper}>
            <div className={styles.content_sub}>Hàng mới về</div>
            <div className={styles.content_header}>Khám phá những ưu đãi tuyệt vời</div>
          </div>
        </div>

        <div className={styles.inspires_content}>
          <div className={styles.shadow_background}></div>
          <img
            alt=''
            className={styles.picture}
            src="https://internetviettel.vn/wp-content/uploads/2017/05/H%C3%ACnh-%E1%BA%A3nh-minh-h%E1%BB%8Da.jpg"
          />
          <div className={styles.content_wrapper}>
            <div className={styles.content_sub}>Giảm thêm 25%</div>
            <div className={styles.content_header}>Miễn phí giao hàng đến hết tháng 3</div>
          </div>
        </div>
      </div>

      <div className={styles.inspires_message}>
        <div className={styles.inspires_message_text}>Venedor Xin Chào</div>
      </div>
    </div>
  );
}

export default Inspires;
