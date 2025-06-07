import styles from './AccountSeller.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import { useEffect, useState } from 'react';
import Items from '../../components/Items/Items';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../redux/actions/product/ProductActions';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Popup';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  const [stockData, setStockData] = useState([])
  const [stockPopup, setStockPopup] = useState(false)

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

  useEffect(() => {
    dispatch(productActions.getStockNumberRequest())
  }, [dispatch])

  useEffect(() => {
    setStockData(productSelect.stockNumber)
  }, [productSelect.stockNumber])

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
            <div className={styles.order_history_wrapper}>
              <div className={styles.order_history_header}>Cửa hàng của bạn</div>
              <div className={styles.storageCheck} onClick={() => setStockPopup(true)}>Kiểm tra kho hôm nay</div>
            </div>

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

      {
        stockPopup
          ?
          <Popup
            onClick={() => {
              setStockPopup(false)
            }}
            highestZIndex={true}
            height='400px'
            width='1000px'
          >
            <div>
              <h1 style={{ textAlign: 'center', marginBottom: 16 }}>Thống kê tồn kho hôm nay</h1>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={stockData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name, props) => {
                      const stockQuantity = props.payload?.stock || 0;
                      return [`Còn lại trong kho: ${stockQuantity}`];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="stock" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Popup>
          :
          undefined
      }
    </div>
  );
}

export default AccountSeller;
