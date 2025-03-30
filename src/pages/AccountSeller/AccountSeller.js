import styles from './AccountSeller.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import { useEffect, useState } from 'react';
import Items from '../../components/Items/Items';
import { LeftArrowIcon, RightArrowIcon } from '../../asset/img/ItemsIcon';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../redux/actions/product/ProductActions';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';
function AccountSeller() {
  const dispatch = useDispatch();
  const productSelect = useSelector(productSelector);
  const [data, setData] = useState();
  const [numberPerPage, setNumberPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const pageContent = [];

  let temp = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (temp.length < numberPerPage) {
        temp.push(data[i]);
      } else {
        pageContent.push(temp);
        temp = [];
        temp.push(data[i]);
      }
      if (i === data.length - 1) {
        pageContent.push(temp);
      }
    }
  }

  useEffect(() => {
    dispatch(productActions.getAllProductRequest());
  }, [dispatch]);

  useEffect(() => {
    if (productSelect.getAllProduct) {
      setData(productSelect.getAllProduct);
    }
  }, [productSelect.getAllProduct]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>My Account</div>
          <MainButton
            className={styles.createProduct}
            title="Create Your Own Products"
            onClick={() => {
              navigate(routes.createProduct);
            }}
          ></MainButton>
        </div>
        <div className={styles.content}>
          <div className={styles.order_history}>
            <div className={styles.order_history_header}>Your Store</div>

            {data && data.length ? (
              pageContent.map((items, index) => {
                return (
                  currentPage === index + 1 && (
                    <div className={styles.order_history_list} key={index}>
                      {items.map((item, index) => {
                        return <Items data={item} vertical={true} edit={true} key={index}></Items>;
                      })}
                    </div>
                  )
                );
              })
            ) : (
              <div className={styles.order_history_content}>You haven't sold any things yet.</div>
            )}
          </div>
        </div>
        <div className={styles.footer}>
          {pageContent.length > 1 && (
            <div className={styles.pages}>
              {currentPage > 1 && (
                <div
                  className={styles.leftArrow}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  <LeftArrowIcon className={styles.rightArrow_icon}></LeftArrowIcon>
                </div>
              )}
              {pageContent.map((item, index) => {
                return (
                  <div
                    className={`${styles.paging} ${currentPage === index + 1 ? styles.paging_active : ''
                      }`}
                    key={index}
                    onClick={() => {
                      setCurrentPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </div>
                );
              })}
              {currentPage < pageContent.length && (
                <div
                  className={styles.rightArrow}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  <RightArrowIcon className={styles.leftArrow_icon}></RightArrowIcon>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSeller;
