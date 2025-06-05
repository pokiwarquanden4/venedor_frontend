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
import Pagination from '../../components/Pagination/Pagination';
function AccountSeller() {
  const dispatch = useDispatch();
  const productSelect = useSelector(productSelector);
  const [data, setData] = useState({
    storages: [],
    totalPages: 0
  });
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 15,
  })

  useEffect(() => {
    dispatch(productActions.getSellerProductRequest({
      page: pageData.page,
      limit: pageData.limit
    }));
  }, [dispatch, pageData.limit, pageData.page]);

  useEffect(() => {
    if (productSelect.sellerProductData) {
      setData(productSelect.sellerProductData);
    }
  }, [productSelect.sellerProductData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>Tài khoản của tôi</div>
          <MainButton
            className={styles.createProduct}
            title="Tạo sản phẩm của bạn"
            onClick={() => {
              navigate(routes.createProduct);
            }}
          ></MainButton>
        </div>
        <div className={styles.content}>
          <div className={styles.order_history}>
            <div className={styles.order_history_header}>Cửa hàng của bạn</div>

            {data.storages && data.storages.length ? (
              <div className={styles.order_history_list}>
                {
                  data.storages.map((item, index) => {
                    return <Items data={item} vertical={true} edit={true} key={index}></Items>;
                  })
                }
              </div>
            ) : (
              <div className={styles.order_history_content}>Bạn chưa bán sản phẩm nào.</div>
            )}
          </div>
        </div>
        <div className={styles.footer}>
          <Pagination pageData={pageData} setPageData={setPageData} totalPages={data.totalPages}></Pagination>
        </div>
      </div>
    </div>
  );
}

export default AccountSeller;
