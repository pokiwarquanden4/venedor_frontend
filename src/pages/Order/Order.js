import styles from './Order.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { historySelector } from '../../redux/selectors/historySelector/historySelector';
import { useEffect, useState } from 'react';
import { historyActions } from '../../redux/actions/purchase/historyActions';
import OrderItems from './OrderItems/OrderItems';
import Pagination from '../../components/Pagination/Pagination';

function Order() {
  const dispatch = useDispatch();
  const historySelect = useSelector(historySelector);
  const [data, setData] = useState({
    storages: [],
    histories: []
  });
  // const [check, setCheck] = useState(false);
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 16,
    productId: 0
  })
  const [selectProductId, setSelectProductId] = useState(0)

  useEffect(() => {
    setData(historySelect.orderList);
  }, [historySelect.orderList]);

  useEffect(() => {
    setPageData((preData) => {
      return {
        ...preData,
        productId: selectProductId
      }
    })
  }, [selectProductId])

  useEffect(() => {
    dispatch(historyActions.orderRequest(pageData));
  }, [dispatch, pageData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header_wrapper}>
          <div className={styles.header}>
            <div className={styles.main_header}>Your Order</div>
            <div className={styles.sub_header}>Your customer is waiting for you response</div>
          </div>
          <select
            className={styles.category_input}
            onChange={(e) => {
              setSelectProductId(e.target.value);
            }}
          >
            <option value={0}>All</option>
            {data.storages.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.productName}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.content}>
          {data.histories.length !== 0 ? (
            <table className={styles.table}>
              <tbody>
                <tr className={styles.content_table_header}>
                  <th className={styles.content_header}>Picture</th>
                  <th className={styles.content_header}>Product Name</th>
                  <th className={styles.content_header}>Quantity</th>
                  <th className={styles.content_header}>Price</th>
                  <th className={styles.content_header}>Status</th>
                  <th className={styles.content_header}>Purchase Date</th>
                  <th className={styles.content_header}>Edit Date</th>
                  <th className={styles.content_header}>Address</th>
                </tr>
                {data.histories.map((item, index) => {
                  const product = data.storages.find(i => i.id === item.productId)
                  return <OrderItems data={item} upperData={product} key={index}></OrderItems>;
                })}
              </tbody>
            </table>
          ) : (
            <div className={styles.notification}>You don't have any order</div>
          )}
          <div className={styles.pagination}>
            <Pagination pageData={pageData} setPageData={setPageData} totalPages={data.totalPages}></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
