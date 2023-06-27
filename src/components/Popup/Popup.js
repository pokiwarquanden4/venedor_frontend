import { useEffect, useRef } from 'react';
import styles from './Popup.module.scss';

function Popup({ width = '800px', height = '500px', children, onClick, right, highestZIndex }) {
  const backGroundRef = useRef();
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (backGroundRef.current.contains(e.target)) {
        onClick();
      }
    };
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  });

  return (
    <div className={`${styles.wrapper} ${highestZIndex ? styles.upper : ''}`}>
      <div className={styles.backGround} ref={backGroundRef}></div>
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
