import styles from './Account.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { addressSelector } from '../../redux/selectors/accountSelector/AddressSelector';
import { useEffect, useState } from 'react';
import { addressActions } from '../../redux/actions/account/AddressActions';
import { historyActions } from '../../redux/actions/purchase/historyActions';
import { historySelector } from '../../redux/selectors/historySelector/historySelector';

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressSelect = useSelector(addressSelector);
  const historySelect = useSelector(historySelector);
  const [dataAddress, setDataAddress] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (addressSelect.addressList) {
      setDataAddress(addressSelect.addressList);
    }
  }, [addressSelect.addressList]);

  useEffect(() => {
    dispatch(addressActions.getAddressRequest());
  }, []);

  useEffect(() => {
    dispatch(historyActions.getHistoryRequest());
  }, []);

  useEffect(() => {
    if (historySelect.cancelOder) {
      dispatch(historyActions.getHistoryRequest());
      dispatch(historyActions.setCancelOder(false));
    }
  }, [historySelect.cancelOder]);

  useEffect(() => {
    if (historySelect.historyList) {
      setHistory(historySelect.historyList);
    }
  }, [historySelect.historyList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>My Account</div>
        </div>
        <div className={styles.content}>
          <div className={styles.order_history}>
            <div className={styles.order_history_header}>Order History</div>
            {history.length !== 0 ? (
              history.map((item, index) => {
                return (
                  <div className={styles.history_list} key={index}>
                    <img
                      className={styles.picture}
                      src={item.imgURL}
                      onClick={() => {
                        navigate(`/category/${item.category}/${item.productId}`);
                      }}
                    ></img>
                    <div className={styles.flex_wrapper}>
                      <div className={styles.list_wrapper}>
                        <div className={styles.name}>{item.productName}</div>
                        <div className={styles.quantity}>Quantity: {item.number}</div>
                      </div>
                      <div className={styles.price}>{item.paid}$</div>
                      <div className={styles.status}>
                        {item.status === 0
                          ? 'Pending'
                          : item.status === 1
                          ? 'Shipping'
                          : item.status === 2
                          ? 'Done'
                          : 'Cancel'}
                      </div>
                      <div className={styles.purchaseDate}>
                        {new Date(item.updatedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                      {item.status !== 2 ? (
                        <div
                          className={` ${item.status === 1 ? styles.disable : styles.delete}`}
                          onClick={() => {
                            if (item.status === 0 || (item.status !== 1 && item.status !== 2)) {
                              dispatch(historyActions.cancelOrderRequest({ historyId: item.id }));
                            }
                          }}
                        >
                          Delete
                        </div>
                      ) : (
                        <div
                          className={styles.confirm}
                          onClick={() => {
                            dispatch(
                              historyActions.cancelOrderRequest({
                                historyId: item.id,
                                number: item.number,
                                productId: item.productId,
                              })
                            );
                          }}
                        >
                          Confirm
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.order_history_content}>You haven't placed any orders yet.</div>
            )}
          </div>
          <div className={styles.account_details}>
            <div className={styles.account_details_header}>Account Details</div>
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
                  title={`VIEW ADDRESS ( ${dataAddress.length} )`}
                ></MainButton>
              </Link>
              <MainButton
                className={styles.editAccount_button}
                title={`EDIT ACCOUNT`}
                onClick={() => {
                  navigate('/account/editAccount');
                }}
              ></MainButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
