import styles from './Img.module.scss';

function Img({ imgUrl, className, onClick, vertical }) {
  const classes = `${styles.wrapper} ${className ? ([styles.className] = className) : ''} ${vertical ? styles.vertical : styles.horizontal
    }`;
  return (
    <div className={classes} onClick={onClick}>
      <img alt='' className={styles.img} src={imgUrl}></img>
    </div>
  );
}

export default Img;
