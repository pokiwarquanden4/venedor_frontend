import styles from './Inspires.module.scss';

function Inspires() {
  return (
    <div className={styles.inspires}>
      <div className={styles.inspires_grid}>
        <div className={styles.inspires_content}>
          <div className={styles.shadow_background}></div>
          <img
            className={styles.picture}
            src="https://pos.nvncdn.net/6c3cf7-882/art/artCT/20160324_GDLULvXePLE92jMtrUM6QzhI.jpg"
          ></img>
          <div className={styles.content_wrapper}>
            <div className={styles.content_sub}>Know You The Best</div>
            <div className={styles.content_header}>Intelligent User Interface</div>
          </div>
        </div>
        <div className={styles.inspires_content}>
          <div className={styles.shadow_background}></div>
          <img
            className={styles.picture}
            src="https://dulichviet.com.vn/images/bandidau/danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi.jpg"
          ></img>
          <div className={styles.content_wrapper}>
            <div className={styles.content_sub}>FullView Experience</div>
            <div className={styles.content_header}>The Power To Move You</div>
          </div>
        </div>
        <div className={styles.inspires_content}>
          <div className={styles.shadow_background}></div>
          <img
            className={styles.picture}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Nji70n0nKnujZh_As_Klbd6AKI9a9vl4Ag&usqp=CAU"
          ></img>
          <div className={styles.content_wrapper}>
            <div className={styles.content_sub}>New Arrivals</div>
            <div className={styles.content_header}>Discover Great Deals</div>
          </div>
        </div>
        <div className={styles.inspires_content}>
          <div className={styles.shadow_background}></div>
          <img
            className={styles.picture}
            src="https://internetviettel.vn/wp-content/uploads/2017/05/H%C3%ACnh-%E1%BA%A3nh-minh-h%E1%BB%8Da.jpg"
          ></img>
          <div className={styles.content_wrapper}>
            <div className={styles.content_sub}>Extra 25% Off &</div>
            <div className={styles.content_header}>Free Delivery Until March</div>
          </div>
        </div>
      </div>
      <div className={styles.inspires_message}>
        <div className={styles.inspires_message_text}>WHAT INSPIRES YOU?</div>
      </div>
    </div>
  );
}

export default Inspires;
