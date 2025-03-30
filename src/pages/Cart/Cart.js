import styles from './Cart.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { UpArrowIcon, DownArrowIcon } from '../../asset/img/ItemsIcon';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../redux/selectors/productSelector/cartSelector';
import { cartActions } from '../../redux/actions/product/cartActions';
import CartItems from './CartIems/CartItems';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import { addressActions } from '../../redux/actions/account/AddressActions';
import { addressSelector } from '../../redux/selectors/accountSelector/AddressSelector';
import Popup from '../../components/Popup/Popup';
import { purchaseActions } from '../../redux/actions/purchase/purchaseActions';
import { notificationActions } from '../../redux/actions/notification/notificationAction';
import { formatVND } from '../../config/utils';

function Cart() {
  const [data, setData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [currentAddress, setCurrentAddress] = useState();
  const [money, setMoney] = useState(true);
  const [dropDownAddress, setDropDownAddress] = useState(true);
  const [addressPopup, setAddressPopup] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [valid, setValid] = useState(false);
  const cartSelect = useSelector(cartSelector);
  const addressSelect = useSelector(addressSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //Orginal
    let temp = 0;
    data.forEach((item) => {
      temp += item.cartQuantity * item.price;
    });
    setOriginalPrice(temp);

    //discount
    temp = 0;
    data.forEach((item) => {
      temp += item.cartQuantity * item.price * (item.saleOff / 100);
    });
    setDiscount(temp);

    //Total
    temp = 0;
    data.forEach((item) => {
      if (item.saleOff) {
        temp += item.cartQuantity * (item.price - item.price * (item.saleOff / 100));
      } else {
        temp += item.cartQuantity * item.price;
      }
    });
    setTotal(temp);
  }, [data]);

  useEffect(() => {
    setData(cartSelect.cartProducts);
  }, [cartSelect.cartProducts]);

  useEffect(() => {
    dispatch(cartActions.getCartProductRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(addressActions.getAddressRequest());
  }, [dispatch]);

  useEffect(() => {
    setAddressData(addressSelect.addressList);
    if (addressSelect.addressList && addressSelect.addressList.length > 0) {
      setCurrentAddress(addressSelect.addressList[0]);
    }
  }, [addressSelect.addressList]);

  useEffect(() => {
    const dataListValid = () => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].number - data[i].cartQuantity < 0) {
          return false;
        }
      }
      return true;
    };
    if (data.length > 0 && dataListValid()) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [data, addressSelect.addressList]);

  return (
    <Fragment>
      {addressPopup && (
        <Popup
          onClick={() => {
            setAddressPopup(false);
          }}
        >
          <div className={styles.address_wrapper}>
            {addressData.map((item, index) => {
              return (
                <div
                  className={styles.addresses}
                  key={index}
                  onClick={() => {
                    setCurrentAddress(item);
                    setAddressPopup(false);
                  }}
                >
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
        </Popup>
      )}
      <div className={styles.wrapper}>
        <div className={styles.wrapper_content}>
          <div className={styles.header}>
            <div className={styles.header_content}>Shopping Cart</div>
            <div className={styles.header_sub_content}>
              Sign up and get 10% off your first order.
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.lists}>
              <div className={styles.lists_header}>
                <div className={styles.img_header}></div>
                <div className={styles.productName_header}>PRODUCT NAME</div>
                <div className={styles.price_header}>PRICE</div>
                <div className={styles.quantity_header}>QUANTITY</div>
              </div>
              <div className={styles.lists_content}>
                {data.length !== 0 &&
                  data.map((item, index) => {
                    return <CartItems data={item} key={index}></CartItems>;
                  })}
              </div>
              <div className={styles.lists_footer}>
                <MainButton
                  className={styles.lists_footer_button_continue}
                  title="CONTINUE SHOPPING"
                  onClick={() => {
                    navigate('/category');
                  }}
                ></MainButton>
              </div>
            </div>
            <div className={styles.money_wrapper}>
              <div className={styles.money}>
                <div className={styles.money_header}>
                  CART TOTAL
                  {money ? (
                    <div
                      className={styles.arrowUpButton_wrapper}
                      onClick={() => {
                        setMoney(false);
                      }}
                    >
                      <UpArrowIcon className={styles.arrowUpButton}></UpArrowIcon>
                    </div>
                  ) : (
                    <div
                      className={styles.arrowDownButton_wrapper}
                      onClick={() => {
                        setMoney(true);
                      }}
                    >
                      <DownArrowIcon className={styles.arrowDownButton}></DownArrowIcon>
                    </div>
                  )}
                </div>
                <div
                  className={`${styles.collapse_wrapper} ${!money ? styles.money_tag_colapse : ''}`}
                >
                  <div className={styles.money_tag}>
                    <div className={styles.total}>
                      <div className={styles.total_header}>Original</div>
                      <div className={styles.total_price}>{formatVND(originalPrice)}</div>
                    </div>
                    <div className={`${styles.total} ${styles.saleOff}`}>
                      <div className={styles.total_header}>Discounted</div>
                      <div className={styles.total_price}>{formatVND(discount)}</div>
                    </div>
                    <div className={styles.grand_total}>
                      <div className={styles.grand_total_header}>Grand Total</div>
                      <div className={styles.grand_total_price}>{formatVND(total)}</div>
                    </div>
                    <div className={styles.checkout_button_wrapper}>
                      <MainButton
                        className={styles.checkout_button}
                        title="CHECK OUT"
                        disable={!valid}
                        onClick={() => {
                          if (currentAddress) {
                            dispatch(
                              purchaseActions.purchaseRequest({ addressId: currentAddress.id })
                            );
                            navigate('/thankyou');
                          } else {
                            dispatch(notificationActions.setNotificationContent('Address Missing'));
                          }
                        }}
                      ></MainButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.address}>
                <div className={styles.address_header}>
                  ADDRESS
                  {dropDownAddress ? (
                    <div
                      className={styles.arrowUpButton_wrapper}
                      onClick={() => {
                        setDropDownAddress(false);
                      }}
                    >
                      <UpArrowIcon className={styles.arrowUpButton}></UpArrowIcon>
                    </div>
                  ) : (
                    <div
                      className={styles.arrowDownButton_wrapper}
                      onClick={() => {
                        setDropDownAddress(true);
                      }}
                    >
                      <DownArrowIcon className={styles.arrowDownButton}></DownArrowIcon>
                    </div>
                  )}
                </div>
                <div
                  className={`${styles.collapse_wrapper} ${!dropDownAddress ? styles.address_tag_colapse : ''
                    }`}
                >
                  <div className={styles.address_tag}>
                    <div className={styles.name}>
                      <div className={styles.name_header}>Name</div>
                      <div className={styles.name_value}>
                        {currentAddress ? currentAddress.name : 'null'}
                      </div>
                    </div>
                    <div className={styles.company}>
                      <div className={styles.company_header}>Company</div>
                      <div className={styles.company_value}>
                        {currentAddress ? currentAddress.company : 'null'}
                      </div>
                    </div>
                    <div className={styles.address1}>
                      <div className={styles.address1_header}>Address1</div>
                      <div className={styles.address1_value}>
                        {currentAddress ? currentAddress.address1 : 'null'}
                      </div>
                    </div>
                    <div className={styles.address2}>
                      <div className={styles.address2_header}>Address2</div>
                      <div className={styles.address2_value}>
                        {currentAddress ? currentAddress.address2 : 'null'}
                      </div>
                    </div>
                    <div className={styles.city}>
                      <div className={styles.city_header}>City</div>
                      <div className={styles.city_value}>
                        {currentAddress ? currentAddress.city : 'null'}
                      </div>
                    </div>
                    <div className={styles.country}>
                      <div className={styles.country_header}>Country</div>
                      <div className={styles.country_value}>
                        {currentAddress ? currentAddress.country : 'null'}
                      </div>
                    </div>
                    <div className={styles.phoneNumber}>
                      <div className={styles.phoneNumber_header}>Phone Number</div>
                      <div className={styles.phoneNumber_value}>
                        {currentAddress ? currentAddress.phoneNumber : 'null'}
                      </div>
                    </div>
                    <div className={styles.checkout_button_wrapper}>
                      <MainButton
                        className={styles.checkout_button}
                        title="CHANGE ADDRESS"
                        onClick={() => {
                          setAddressPopup(true);
                        }}
                      ></MainButton>
                      <MainButton
                        className={styles.checkout_button}
                        title="ADD ADDRESS"
                        onClick={() => {
                          navigate(routes.address);
                        }}
                      ></MainButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
