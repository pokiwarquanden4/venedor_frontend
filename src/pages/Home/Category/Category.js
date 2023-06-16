import { useEffect, useRef, useState } from 'react';
import { LeftArrowIcon, RightArrowIcon } from '../../../asset/img/ItemsIcon';
import styles from './Category.module.scss';
import CategoryItems from './CategoryItems/CategoryItems';
import category from '../../../config/category';

function Category() {
  const [numberPerPage, setNumeberPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const listRef = useRef([]);
  const scrollRef = useRef();

  //Convert Default Data
  const convertData = [];
  let tempData = [];
  let count = 0;
  for (let i = 0; i < category.length; i++) {
    if (i === category.length - 1) {
      if (numberPerPage === 1) {
        convertData.push(tempData);
        tempData = [];
      }
      tempData.push(category[i]);
      convertData.push(tempData);
      break;
    }

    if (count === numberPerPage) {
      convertData.push(tempData);
      tempData = [];
      count = 0;
      i--;
    } else {
      count++;
      tempData.push(category[i]);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Shop by Category</div>
      <div className={styles.contents}>
        <div
          onClick={() => {
            if (currentPage > 0) {
              listRef.current[currentPage - 1].scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
              });
              setCurrentPage(currentPage - 1);
            }
          }}
          className={`${styles.nextPageButtonLeft} ${
            currentPage === 0 ? styles.disableButton : styles.next_left
          } `}
        >
          <LeftArrowIcon className={styles.icon}></LeftArrowIcon>
        </div>
        <div className={styles.content}>
          <div ref={scrollRef} className={styles.items}>
            {convertData.map((items, index) => {
              return (
                <div
                  ref={(element) => {
                    listRef.current[convertData.indexOf(items)] = element;
                  }}
                  className={styles.group_items}
                  key={index}
                >
                  {items.map((item, index) => {
                    return <CategoryItems data={item} key={index}></CategoryItems>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div
          onClick={() => {
            if (currentPage < convertData.length - 1) {
              listRef.current[currentPage + 1].scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
              });
              setCurrentPage(currentPage + 1);
            }
          }}
          className={`${styles.nextPageButtonRight} ${
            currentPage === convertData.length - 1 ? styles.disableButton : styles.next_right
          } `}
        >
          <RightArrowIcon className={styles.icon}></RightArrowIcon>
        </div>
      </div>
      <div className={styles.pages}>
        {convertData.map((items, index) => {
          return (
            <div
              className={`${styles.page} ${index === currentPage ? styles.page_chose : ''}`}
              key={index}
              onClick={() => {
                listRef.current[index].scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'nearest',
                });
                setCurrentPage(index);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
