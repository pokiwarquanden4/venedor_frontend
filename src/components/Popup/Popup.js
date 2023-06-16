import styles from './Popup.module.scss';

function Popup({ width = '800px', height = '500px', children, onClick, right, highestZIndex }) {
  return (
    <div className={`${styles.wrapper} ${highestZIndex ? styles.upper : ''}`}>
      <div className={styles.backGround}></div>
      <div className={`${styles.content} ${right ? styles.right : ''}`} style={{ width, height }}>
        {children}
        <div className={styles.exit_button} onClick={onClick}>
          X
        </div>
      </div>
    </div>
  );
}

export default Popup;
