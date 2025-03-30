import styles from './Order.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { historySelector } from '../../redux/selectors/historySelector/historySelector';
import { useEffect, useState } from 'react';
import { historyActions } from '../../redux/actions/purchase/historyActions';
import OrderItems from './OrderItems/OrderItems';

function Order() {
  const dispatch = useDispatch();
  const historySelect = useSelector(historySelector);
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setData(historySelect.orderList);
  }, [historySelect.orderList]);

  useEffect(() => {
    dispatch(historyActions.orderRequest());
  }, [dispatch]);

  function checkHistoriesEmpty(products) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].Histories.length > 0) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    setCheck(checkHistoriesEmpty(data));
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>Your Order</div>
          <div className={styles.sub_header}>Your customer is waiting for you response</div>
        </div>
        <div className={styles.content}>
          {data.length !== 0 && check ? (
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
                {data.map((item) => {
                  return item.Histories.map((innerItem, index) => {
                    return <OrderItems data={innerItem} upperData={item} key={index}></OrderItems>;
                  });
                })}
              </tbody>
            </table>
          ) : (
            <div className={styles.notification}>You don't have any order</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
