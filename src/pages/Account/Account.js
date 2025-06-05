import styles from './Account.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { addressSelector } from '../../redux/selectors/accountSelector/AddressSelector';
import { useCallback, useEffect, useState } from 'react';
import { addressActions } from '../../redux/actions/account/AddressActions';
import { historyActions } from '../../redux/actions/purchase/historyActions';
import { historySelector } from '../../redux/selectors/historySelector/historySelector';
import { formatVND } from '../../config/utils';
import { productActions } from '../../redux/actions/product/ProductActions';
import { notificationActions } from '../../redux/actions/notification/notificationAction';
import Popup from '../../components/Popup/Popup';

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressSelect = useSelector(addressSelector);
  const historySelect = useSelector(historySelector);
  const [dataAddress, setDataAddress] = useState([]);
  const [history, setHistory] = useState([]);
  const [feedbackData, setFeedbackData] = useState({});
  const [openFeedback, setOpenFeedback] = useState(false);

  useEffect(() => {
    if (addressSelect.addressList) {
      setDataAddress(addressSelect.addressList);
    }
  }, [addressSelect.addressList]);

  useEffect(() => {
    dispatch(addressActions.getAddressRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(historyActions.getHistoryRequest());
  }, [dispatch]);

  useEffect(() => {
    if (historySelect.cancelOder) {
      dispatch(historyActions.getHistoryRequest());
      dispatch(historyActions.setCancelOder(false));
    }
  }, [dispatch, historySelect.cancelOder]);

  useEffect(() => {
    if (historySelect.historyList) {
      setHistory(historySelect.historyList);
    }
  }, [historySelect.historyList]);

  const onFeedBack = useCallback(() => {
    if (!feedbackData.rate) {
      dispatch(notificationActions.setNotificationContent('Vui lòng điền đầy đủ thông tin!'));
      return
    }

    dispatch(productActions.createCommentRequest({
      productId: feedbackData.productId,
      content: feedbackData.content,
      rate: feedbackData.rate,
      parentId: feedbackData.parentId,
      historyId: feedbackData.historyId,
    }))

    dispatch(notificationActions.setNotificationContent('Cảm ơn bạn đã đánh giá!'));
    setOpenFeedback(false);

    navigate(`/category/${feedbackData.category}/${feedbackData.productId}`);

    setFeedbackData({
      ...feedbackData,
      productId: null,
      content: null,
      rate: null,
    });
  }, [feedbackData, dispatch, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>My Account</div>
        </div>
        <div className={styles.content}>
          <div className={styles.order_history}>
            <div className={styles.order_history_header}>Lịch sử đơn hàng</div>
            <div className={styles.history_content}>
              {history.length !== 0 ? (
                history.map((item, index) => {
                  const productName = item.productName +
                    (item.StorageSpecificPic && item.StorageSpecificPic.option1 ? ` - ${item.StorageSpecificPic.option1}` : '') +
                    (item.StorageSpecificPic && item.StorageSpecificPic.option2 ? ` - ${item.StorageSpecificPic.option2}` : '');

                  const imgURL = item.StorageSpecificPic && item.StorageSpecificPic.imgURL ? item.StorageSpecificPic.imgURL : item.imgURL;

                  return (
                    <div className={styles.history_list} key={index}>
                      <img
                        alt=''
                        className={styles.picture}
                        src={imgURL}
                        onClick={() => {
                          navigate(`/category/${item.category}/${item.productId}`);
                        }}
                      ></img>
                      <div className={styles.flex_wrapper}>
                        <div className={styles.list_wrapper}>
                          <div className={styles.name} title={productName}>
                            {productName}
                          </div>
                          <div className={styles.quantity}>Số lượng: {item.number}</div>
                          <div className={styles.id}>Mã đơn: {item.id}</div>
                        </div>
                        <div className={styles.price}>{formatVND(item.paid)}</div>
                        <div className={styles.status}>
                          {item.status === 0
                            ? 'Chờ xử lý'
                            : item.status === 1
                              ? 'Đang giao'
                              : item.status === 2
                                ? 'Hoàn thành'
                                : 'Đã hủy'}
                        </div>
                        <div className={styles.purchaseDate}>
                          {new Date(item.updatedAt).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </div>
                        <div className={styles.status_content}>
                          {item.status === 2 && !item.feedbackId && (
                            <div
                              className={styles.addComment}
                              onClick={() => {
                                setOpenFeedback(true);
                                setFeedbackData({
                                  ...feedbackData,
                                  historyId: item.id,
                                  productId: item.productId,
                                  parentId: null,
                                });
                              }}
                            >
                              Đánh giá sản phẩm
                            </div>
                          )}
                          {item.status !== 2 ? (
                            <div
                              className={`${item.status === 1 ? styles.disable : styles.delete}`}
                              onClick={() => {
                                if (item.status === 0 || (item.status !== 1 && item.status !== 2)) {
                                  dispatch(historyActions.cancelOrderRequest({ historyId: item.id }));
                                }
                              }}
                            >
                              Hủy đơn hàng
                            </div>
                          ) : (
                            <div
                              className={styles.confirm}
                            >
                              Đã hoàn thành
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.order_history_content}>Bạn chưa có đơn hàng nào.</div>
              )}
            </div>
          </div>
          <div className={styles.account_details}>
            <div className={styles.account_details_header}>Thông tin tài khoản</div>
            <div className={styles.account_details_content}>
              <div className={styles.addresses}>
                {dataAddress.length !== 0 &&
                  dataAddress.map((item, index) => {
                    return (
                      <div className={styles.addresses_wrapper} key={index}>
                        <div className={styles.addresses_content}>{item.name}</div>
                        <div className={styles.addresses_content}>{item.company}</div>
                        <div className={styles.addresses_content}>{item.address1}</div>
                        <div className={styles.addresses_content}>{item.address2}</div>
                        <div className={styles.addresses_content}>
                          {item.city} {item.phoneNumber}
                        </div>
                        <div className={styles.addresses_content}>{item.country}</div>
                      </div>
                    );
                  })}
              </div>
              <Link to={routes.address}>
                <MainButton
                  className={styles.address_button}
                  title={`XEM ĐỊA CHỈ ( ${dataAddress.length} )`}
                ></MainButton>
              </Link>
              <MainButton
                className={styles.editAccount_button}
                title={`CHỈNH SỬA TÀI KHOẢN`}
                onClick={() => {
                  navigate('/account/editAccount');
                }}
              ></MainButton>
            </div>
          </div>
        </div>
      </div>

      {
        openFeedback ? (
          <Popup
            width='400px'
            height='auto'
            onClick={() => {
              setOpenFeedback(false)
            }}
            highestZIndex={true}
          >
            <div className={styles.feedback_container}>
              <div className={styles.feedback_header}>Đánh giá sản phẩm</div>
              <div className={styles.feedback_stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${feedbackData.rate >= star ? styles.selected : ''}`}
                    onClick={() => setFeedbackData((prev) => ({ ...prev, rate: star }))}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                className={styles.feedback_comment}
                placeholder="Nhập nhận xét của bạn..."
                value={feedbackData.content || ''}
                onChange={(e) => setFeedbackData((prev) => ({ ...prev, content: e.target.value }))}
              ></textarea>
              <div className={styles.feedback_actions}>
                <button className={styles.submit_button} onClick={onFeedBack}>
                  Gửi đánh giá
                </button>
                <button className={styles.cancel_button} onClick={() => setOpenFeedback(false)}>
                  Hủy
                </button>
              </div>
            </div>
          </Popup>
        ) : undefined
      }
    </div >
  );
}

export default Account;
