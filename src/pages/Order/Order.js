import styles from './Order.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { historySelector } from '../../redux/selectors/historySelector/historySelector';
import { useEffect, useRef, useState } from 'react';
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
  const [selectedId, setSelectedId] = useState(undefined);
  // const [check, setCheck] = useState(false);
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 16,
    productId: 0,
    selectedId: selectedId
  })
  const [selectProductId, setSelectProductId] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState('0')
  const selectedIdRef = useRef(undefined);

  useEffect(() => {
    setData(historySelect.orderList);
  }, [historySelect.orderList]);

  useEffect(() => {
    setPageData((preData) => {
      return {
        ...preData,
        statusFilter: selectedStatus,
        productId: selectProductId,
        selectedId: selectedId
      }
    })
  }, [selectProductId, selectedId, selectedStatus])

  useEffect(() => {
    dispatch(historyActions.orderRequest(pageData));
  }, [dispatch, pageData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header_wrapper}>
          <div className={styles.header}>
            <div className={styles.main_header}>Đơn hàng của bạn</div>
            <div className={styles.sub_header}>Khách hàng đang chờ phản hồi từ bạn</div>
          </div>
          <div className={styles.search_wrapper}>
            <input
              type="text"
              placeholder="Tìm theo ID"
              className={styles.search_input}
              onChange={(e) => {
                if (e.target.value === '') {
                  selectedIdRef.current = undefined;
                } else {
                  selectedIdRef.current = Number(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelectedId(selectedIdRef.current); // Thực hiện tìm kiếm khi nhấn Enter
                }
              }}
            />
            <button
              className={styles.search_button}
              onClick={() => {
                setSelectedId(selectedIdRef.current);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={styles.search_icon}
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
              </svg>
            </button>
          </div>
          <select
            className={styles.status_input}
            onChange={(e) => {
              setSelectedStatus(e.target.value)
            }}
          >
            <option value='-1'>Tất cả</option>
            <option value="0">Chờ xử lý</option>
            <option value="1">Đang giao</option>
            <option value="2">Hoàn thành</option>
            <option value="3">Đã hủy</option>
          </select>
          <select
            className={styles.category_input}
            onChange={(e) => {
              setSelectProductId(e.target.value);
            }}
          >
            <option value={0}>Tất cả</option>
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
                  <th className={styles.content_header}>ID</th>
                  <th className={styles.content_header}>Hình ảnh</th>
                  <th className={styles.content_header}>Tên sản phẩm</th>
                  <th className={styles.content_header}>Giá</th>
                  <th className={styles.content_header}>Trạng thái</th>
                  <th className={styles.content_header}>Ngày mua</th>
                  <th className={styles.content_header}>Ngày chỉnh sửa</th>
                  <th className={styles.content_header}>Địa chỉ</th>
                </tr>
                {data.histories.map((item, index) => {
                  const product = data.storages.find(i => i.id === item.productId)
                  return <OrderItems data={item} upperData={product} key={index}></OrderItems>;
                })}
              </tbody>
            </table>
          ) : (
            <div className={styles.notification}>Bạn chưa có đơn hàng nào</div>
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
