import styles from './Collapse.module.scss';
import { DownArrowIcon, UpArrowIcon } from '../../asset/img/ItemsIcon';
import { useEffect, useRef, useState } from 'react';

function Collapse({ title, content, onClick }) {
  const [currentTile, setCurrentTile] = useState(title);
  const headerRef = useRef();
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (headerRef.current.contains(e.target)) {
        setCollapse(!collapse);
      } else {
        setCollapse(false);
      }
    };

    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, [collapse]);
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${collapse ? styles.header_fill : ''}`} ref={headerRef}>
        <div className={styles.header_title}>{currentTile}</div>
        {collapse ? (
          <div className={styles.upArrowButton}>
            <UpArrowIcon className={styles.arrowIcon}></UpArrowIcon>
          </div>
        ) : (
          <div className={styles.downArrowButton}>
            <DownArrowIcon className={styles.arrowIcon}></DownArrowIcon>
          </div>
        )}
      </div>
      <div className={`${styles.content} ${!collapse ? styles.collapse : ''}`}>
        <div className={styles.dropdown}>
          {content.map((item, index) => {
            return (
              <div
                className={styles.dropdown_item}
                key={index}
                onClick={() => {
                  onClick(item);
                  setCurrentTile(item);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Collapse;
