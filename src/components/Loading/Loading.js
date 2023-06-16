import styles from './Loading.module.scss';

function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.backGround}></div>
      <div className={styles.lds_facebook}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
