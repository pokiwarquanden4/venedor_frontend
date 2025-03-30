import styles from './BackGroundImg.module.scss';
import { useRef } from 'react';
import { ThreeDotIcon } from '../../asset/img/ItemsIcon';
import { TrashCanIcon } from '../../asset/img/WishListIcon';

function BackGroundImg({ className, main, imgURL, deleteProduct }) {
  const imgRef = useRef();
  const imgNameRef = useRef();
  const classes = `${styles.img_container} ${className ? ([styles.className] = className) : ''}`;
  return (
    <div className={classes}>
      <img alt='' className={styles.img} ref={imgRef} src={imgURL}></img>
      <div className={styles.img_name} ref={imgNameRef}>
        {main ? 'Main picture of your product' : 'Preview picture of your product'}
      </div>
      <div className={styles.options} onClick={deleteProduct}>
        <TrashCanIcon className={styles.options_icon}></TrashCanIcon>
      </div>
    </div>
  );
}

export default BackGroundImg;
