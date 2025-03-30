import { useEffect, useRef, useState } from 'react';
import { LeftArrowIcon, RightArrowIcon } from '../../../asset/img/ItemsIcon';
import styles from './DailyDeal.module.scss';
import Items from '../../../components/Items/Items';
import { useDispatch, useSelector } from 'react-redux';
import { homeSelector } from '../../../redux/selectors/productSelector/homeSelector';
import { homeActions } from '../../../redux/actions/product/homeActions';

function DailyDeal() {
  const dispatch = useDispatch();
  const homeSelect = useSelector(homeSelector);
  const [numberPerPage, setNumeberPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const listRef = useRef([]);
  const scrollRef = useRef();
  const [data, setData] = useState([]);
  const [convertData, setConvertData] = useState([]);
  //Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 790) {
        setNumeberPerPage(2);
        setCurrentPage(0);
      } else {
        console.log('in');
        setNumeberPerPage(1);
        setCurrentPage(0);
      }
    };

    window.addEventListener('resize', handleResize);
  }, []);

  //Convert Default Data
  useEffect(() => {
    const results = [];
    let tempData = [];
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (i === data.length - 1) {
        if (numberPerPage === 1) {
          results.push(tempData);
          tempData = [];
        }
        tempData.push(data[i]);
        results.push(tempData);
        break;
      }

      if (count === numberPerPage) {
        results.push(tempData);
        tempData = [];
        count = 0;
        i--;
      } else {
        count++;
        tempData.push(data[i]);
      }
    }

    setConvertData(results);
  }, [data, numberPerPage]);

  useEffect(() => {
    dispatch(homeActions.dailyDealsProductRequest());
  }, [dispatch]);
  useEffect(() => {
    setData(homeSelect.dailyDeals);
  }, [homeSelect.dailyDeals]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Daily Deals</div>
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
          className={`${currentPage === 0 ? styles.disableButton : styles.next_left} `}
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
                    return <Items data={item} key={index}></Items>;
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
          className={`${currentPage === convertData.length - 1 ? styles.disableButton : styles.next_right
            } `}
        >
          <RightArrowIcon className={styles.icon}></RightArrowIcon>
        </div>
      </div>
    </div>
  );
}

export default DailyDeal;
