import { useEffect, useState } from 'react';
import Items from '../../../components/Items/Items';
import styles from './ProductList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { homeSelector } from '../../../redux/selectors/productSelector/homeSelector';
import { homeActions } from '../../../redux/actions/product/homeActions';

function ProductList() {
  const dispatch = useDispatch();
  const homeSelect = useSelector(homeSelector);
  const [latestData, setLatestData] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);
  const [featureData, setFeatureData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage === 1 && !latestData.length) {
      dispatch(homeActions.latestProductRequest());
    }
  }, [currentPage, dispatch, latestData.length]);
  useEffect(() => {
    setLatestData(homeSelect.latestProducts);
  }, [homeSelect.latestProducts]);

  useEffect(() => {
    if (currentPage === 2 && !bestSellerData.length) {
      dispatch(homeActions.bestSellerProductRequest());
    }
  }, [bestSellerData.length, currentPage, dispatch]);
  useEffect(() => {
    setBestSellerData(homeSelect.bestSellerProducts);
  }, [homeSelect.bestSellerProducts]);

  useEffect(() => {
    if (currentPage === 3 && !featureData.length) {
      dispatch(homeActions.featureProductRequest());
    }
  }, [currentPage, dispatch, featureData.length]);
  useEffect(() => {
    setFeatureData(homeSelect.featureProducts);
  }, [homeSelect.featureProducts]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headers}>
        <div
          className={`${styles.header} ${currentPage === 1 ? styles.header_select : ''}`}
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          Mới nhất
        </div>
        <div className={styles.header_separate}>/</div>
        <div
          className={`${styles.header} ${currentPage === 2 ? styles.header_select : ''}`}
          onClick={() => {
            setCurrentPage(2);
          }}
        >
          Bán chạy nhất
        </div>
        <div className={styles.header_separate}>/</div>
        <div
          className={`${styles.header} ${currentPage === 3 ? styles.header_select : ''}`}
          onClick={() => {
            setCurrentPage(3);
          }}
        >
          Dành cho bạn
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.content_wrapper}>
          {currentPage === 1 &&
            latestData.map((item, index) => {
              return <Items data={item} key={index} vertical={true}></Items>;
            })}
          {currentPage === 2 &&
            bestSellerData.map((item, index) => {
              return <Items data={item} key={index} vertical={true}></Items>;
            })}
          {currentPage === 3 &&
            featureData.map((item, index) => {
              return <Items data={item} key={index} vertical={true}></Items>;
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
