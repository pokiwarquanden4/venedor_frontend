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
import { adminActions } from '../../redux/actions/account/AdminActions';
import { uploadFirebaseImage } from '../../fireBase/imageUpload';

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressSelect = useSelector(addressSelector);
  const historySelect = useSelector(historySelector);
  const [dataAddress, setDataAddress] = useState([]);
  const [history, setHistory] = useState([]);
  const [feedbackData, setFeedbackData] = useState({});
  const [openFeedback, setOpenFeedback] = useState(false);
  const [refundPopup, setRefundPopup] = useState(false)
  const [refundPolicy, setRefundPolicy] = useState()
  const [refundPolicyPopup, setRefundPolicyPopup] = useState(false)
  const [refundData, setRefundData] = useState({
    historyId: undefined,
    productId: undefined,
    reason: undefined,
    evidenceURL: undefined,
    refundBankURL: undefined,
  })

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
                  const hasBeenRefund = item?.Storage?.Refunds?.length
                  const refundStatus = item?.Storage?.Refunds?.[0]?.status

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
                          {item.status === 2 && !item.feedbackId && !hasBeenRefund ? (
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
                              Đánh giá
                            </div>
                          ) : undefined}
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
                            (refundStatus === 1 || refundStatus === 3)
                              ? (
                                <div
                                  className={`${refundStatus !== 1 ? styles.disable : styles.confirm_out}`}
                                  onClick={() => {
                                    if (refundStatus === 1) {
                                      setRefundPolicy({
                                        refundId: item.Storage.Refunds[0].id,
                                        status: 3
                                      })
                                      setRefundPolicyPopup(true)
                                    }
                                  }}
                                >
                                  Gửi hàng về
                                </div>
                              )
                              : refundStatus === 4
                                ? (
                                  <div className={styles.confirm_success}>
                                    Trả hàng thành công
                                  </div>
                                )
                                : (
                                  <div
                                    className={`${hasBeenRefund ? styles.disable : styles.confirm_out}`}
                                    onClick={() => {
                                      if (!hasBeenRefund) {
                                        setRefundData(prev => ({ ...prev, productId: item.productId, historyId: item.id }));
                                        setRefundPopup(true);
                                      }
                                    }}
                                  >
                                    Trả hàng
                                  </div>
                                )
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
      {refundPopup ? (
        <Popup
          onClick={() => setRefundPopup(false)}
          highestZIndex={true}
          width="400px"
          height="auto"
        >
          <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>Yêu cầu trả hàng</h2>
            <textarea
              style={{
                width: '100%',
                minHeight: 120,
                borderRadius: 8,
                border: '1px solid #ccc',
                padding: 12,
                fontSize: 16,
                resize: 'vertical'
              }}
              placeholder="Nhập lý do trả hàng..."
              value={refundData.reason || ''}
              onChange={e => setRefundData(prev => ({ ...prev, reason: e.target.value }))}
            />
            <div style={{ marginTop: 16 }}>
              <input
                type="file"
                accept="video/*"
                style={{
                  width: '100%',
                  marginBottom: 12,
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  padding: 12,
                  fontSize: 16,
                }}
                placeholder="Tải lên video bằng chứng (nếu có)..."
                onChange={e => {
                  const file = e.target.files[0];
                  setRefundData(prev => ({ ...prev, evidenceURL: file }));
                }}
              />
              <input
                type="file"
                accept="image/*"
                style={{
                  width: '100%',
                  marginBottom: 12,
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  padding: 12,
                  fontSize: 16,
                }}
                placeholder="Tải lên ảnh mã QR nhận hoàn tiền (nếu có)..."
                onChange={e => {
                  const file = e.target.files[0];
                  setRefundData(prev => ({ ...prev, refundBankURL: file }));
                }}
              />
            </div>
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <MainButton
                className={styles.reportButton}
                title="Gửi yêu cầu"
                onClick={async () => {
                  // Kiểm tra các trường bắt buộc
                  if (
                    !refundData.reason ||
                    (!refundData.evidenceURL && !refundData.refundBankURL)
                  ) {
                    dispatch(notificationActions.setNotificationContent('Vui lòng nhập lý do trả hàng và tải lên ít nhất 1 file bằng chứng hoặc mã QR!'));
                    return;
                  }

                  // Upload file lên Firebase nếu là file object
                  let evidenceURL = refundData.evidenceURL;
                  let refundBankURL = refundData.refundBankURL;

                  if (evidenceURL && typeof evidenceURL === 'object') {
                    evidenceURL = await uploadFirebaseImage({ location: 'refundEvidence' }, evidenceURL);
                  }
                  if (refundBankURL && typeof refundBankURL === 'object') {
                    refundBankURL = await uploadFirebaseImage({ location: 'refundQR' }, refundBankURL);
                  }

                  const submitData = {
                    ...refundData,
                    evidenceURL,
                    refundBankURL,
                  };

                  dispatch(adminActions.createRefundRequest(submitData));
                  setRefundPopup(false);
                  dispatch(notificationActions.setNotificationContent('Đã gửi yêu cầu trả hàng!'));
                }}
              />
            </div>
          </div>
        </Popup>
      ) : undefined}

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

      {
        refundPolicyPopup ? (
          <Popup
            onClick={() => {
              setRefundPolicyPopup(false)
            }}
            highestZIndex={true}
          >
            <div style={{ padding: 24, minWidth: 350 }}>
              <h2 style={{ marginBottom: 20, fontSize: 26, fontWeight: 700 }}>Hướng dẫn trả hàng</h2>
              <ol style={{ marginBottom: 24, paddingLeft: 24, fontSize: 18 }}>
                <li style={{ marginBottom: 10 }}>
                  <strong>Đóng gói sản phẩm</strong> cần trả lại một cách cẩn thận.
                </li>
                <li style={{ marginBottom: 10 }}>
                  <strong>Gửi hàng về địa chỉ:</strong><br />
                  <span style={{ color: '#3498db', fontWeight: 500 }}>
                    123 Đường Trả Hàng, Phường X, Quận Y, TP. Z (hoặc địa chỉ shop cung cấp)
                  </span>
                </li>
                <li style={{ marginBottom: 10 }}>
                  Sau khi gửi hàng, <strong>quay lại trang này</strong> và nhấn nút <b>Xác nhận đã gửi hàng</b> bên dưới.
                </li>
                <li style={{ marginBottom: 10 }}>
                  Đợi cửa hàng xác nhận đã nhận được hàng. Tiền sẽ được hoàn vào mã QR bạn đã cung cấp trước đó.
                </li>
              </ol>
              <div style={{ marginTop: 24, textAlign: 'right' }}>
                <MainButton
                  className={styles.reportButton}
                  title="Xác nhận đã gửi hàng"
                  onClick={() => {
                    dispatch(adminActions.handleRefundRequest({
                      refundId: refundPolicy.refundId,
                      status: refundPolicy.status
                    }));
                    setRefundPolicyPopup(false);
                    dispatch(notificationActions.setNotificationContent('Thành công'));
                  }}
                />
              </div>
              <div style={{ marginTop: 32, textAlign: 'center', fontSize: 20, color: '#2ecc40', fontWeight: 600 }}>
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
              </div>
            </div>
          </Popup>
        ) : undefined
      }
    </div >
  );
}

export default Account;
