import { useNavigate } from 'react-router-dom';
import {
  BoxIcon,
  GraphIcon,
  HeartIcon,
  HumanIcon,
  LogoutIcon,
  MessageIcon,
  PolicyIcon,
  RefundIcon,
  SearchIcon,
  ShopIcon,
} from '../../../asset/img/HeaderIcon';
import styles from './HeaderFloating.module.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import Popup from '../../../components/Popup/Popup';
import CartPopUp from '../../../components/CartPopUp/CartPopUp';
import SearchPopup from '../../../components/SearchPopup/SearchPopup';
import LoginForm from '../../../components/LoginForm/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { LoginSelector } from '../../../redux/selectors/accountSelector/LoginSelector';
import { loginActions } from '../../../redux/actions/account/LoginActions';
import Cookies from 'universal-cookie';
import { productSearchSelector } from '../../../redux/selectors/productSelector/productSearchSelector';
import { productSearchActions } from '../../../redux/actions/product/ProductSearchAction';
import { cartSelector } from '../../../redux/selectors/productSelector/cartSelector';
import { cartActions } from '../../../redux/actions/product/cartActions';
import routes from '../../../config/routes';

function HeaderFloating({ mainRef }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const inputBar = useRef();
  const [inputBarDropDown, setInputBarDropDown] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [cart, setCart] = useState(false);
  const navigate = useNavigate();
  const loginSelect = useSelector(LoginSelector);
  const cartSelect = useSelector(cartSelector);
  const [loginStatus, setLoginStatus] = useState(false);
  const productSelect = useSelector(productSearchSelector);
  const [data, setData] = useState([]);

  useEffect(() => {
    const showResults = (e) => {
      if (!inputBar.current) return;
      if (inputBar.current.contains(e.target)) {
        setInputBarDropDown(true);
      } else {
        setInputBarDropDown(false);
      }
    };

    document.addEventListener('click', showResults);
    return () => {
      document.removeEventListener('click', showResults);
    };
  });

  useEffect(() => {
    setLoginStatus(loginSelect.login);
  }, [loginSelect.login]);

  useEffect(() => {
    if (productSelect.quickSearchProduct) {
      setData(productSelect.quickSearchProduct);
    }
  }, [productSelect.quickSearchProduct]);

  useEffect(() => {
    const handleSearch = setTimeout(() => {
      if (searchValue) {
        dispatch(
          productSearchActions.quickSearchProductRequest({
            content: searchValue,
          })
        );
      } else {
        setData([]);
      }
    }, 500);

    return () => {
      clearTimeout(handleSearch);
    };
  }, [dispatch, searchValue]);

  useEffect(() => {
    if (cartSelect.showing) {
      setCart(cartSelect.showing);
      dispatch(cartActions.setCartShowing(false));
    }
  }, [cartSelect.showing, dispatch]);

  return (
    <Fragment>
      {cart && (
        <Popup
          onClick={() => {
            setCart(false);
          }}
          highestZIndex={true}
          right={true}
          onTop={true}
        >
          <CartPopUp></CartPopUp>
        </Popup>
      )}
      {!loginStatus && loginSelect.loginPopup && (
        <Popup
          width="380px"
          height="auto"
          onClick={() => {
            dispatch(loginActions.loginPopup(false));
          }}
          highestZIndex={true}
        >
          <LoginForm
            onClick={() => {
              dispatch(loginActions.loginPopup(false));
            }}
          ></LoginForm>
        </Popup>
      )}
      <div className={styles.sticky} ref={mainRef}>
        <div className={styles.wrapper}>
          <div className={styles.header_info}>
            <div
              className={styles.logo_wrapper}
              onClick={() => {
                navigate(routes.home);
              }}
            >
              <img
                alt=''
                src="https://cdn.shopify.com/s/files/1/0438/9070/4538/files/logo.png?v=1614325954"
                className={styles.logo}
              ></img>
            </div>
            {(!loginSelect.loginRole || loginSelect.loginRole === 'User') ? (
              <div className={styles.searchBar_wrapper}>
                {inputBarDropDown ? (
                  <div className={styles.searchBar_dropdown}>
                    <SearchPopup data={data}></SearchPopup>
                  </div>
                ) : undefined}
                <input
                  placeholder="Tìm trong cửa hàng"
                  className={styles.inputBar}
                  ref={inputBar}
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                ></input>
                <SearchIcon
                  className={styles.searchIcon}
                  onClick={() => {
                    navigate('/search');
                  }}
                ></SearchIcon>
              </div>
            ) : undefined}
            <div className={styles.info_wrapper}>
              <SearchIcon
                className={`${styles.searchIcon} ${styles.responsive}`}
                onClick={() => {
                  navigate('/search');
                }}
              ></SearchIcon>
              {(loginSelect.loginRole === 'Seller' || loginSelect.loginRole === 'User' || !loginSelect.loginRole || loginSelect.loginRole === 'Admin') ?
                <HumanIcon
                  className={styles.humanIcon}
                  onClick={() => {
                    if (!loginStatus) {
                      dispatch(loginActions.loginPopup(true));
                    } else {
                      if (loginSelect.loginRole === 'User') {
                        navigate('/account');
                      }
                      if (loginSelect.loginRole === 'Seller') {
                        navigate('/account/editAccount');
                      }
                      if (loginSelect.loginRole === 'Admin') {
                        navigate('/account/admin');
                      }
                    }
                  }}
                ></HumanIcon>
                :
                undefined}
              {(loginSelect.loginRole === 'Seller' || loginSelect.loginRole === 'Stocker' || loginSelect.loginRole === 'Admin') ?
                <ShopIcon
                  className={styles.shopIcon}
                  onClick={() => {
                    if (!loginStatus) {
                      dispatch(loginActions.loginPopup(true));
                    } else {
                      if ((loginSelect.loginRole === 'Seller' || loginSelect.loginRole === 'Stocker')) {
                        navigate('/accountSeller');
                      }

                      if (loginSelect.loginRole === 'Admin') {
                        navigate(routes.repoted)
                      }
                    }
                  }}
                ></ShopIcon>
                :
                undefined
              }
              {(loginSelect.loginRole === 'User' || !loginSelect.loginRole) ?
                <HeartIcon
                  className={styles.heartIcon}
                  onClick={() => {
                    if (!loginStatus) {
                      dispatch(loginActions.loginPopup(true));
                    } else {
                      navigate('/wishlist');
                    }
                  }}
                ></HeartIcon> : undefined}

              {(loginSelect.loginRole === 'Seller' || loginSelect.loginRole === 'Stocker' || loginSelect.loginRole === 'Shipper' || loginSelect.loginRole === 'User' || !loginSelect.loginRole)
                ?
                <BoxIcon
                  className={styles.boxIcon}
                  onClick={() => {
                    if (loginSelect.loginRole === 'Seller' || loginSelect.loginRole === 'Stocker' || loginSelect.loginRole === 'Shipper') {
                      navigate(routes.oder);
                    } else {
                      if (!loginStatus) {
                        dispatch(loginActions.loginPopup(true));
                      } else {
                        setCart(true);
                      }
                    }
                  }}
                ></BoxIcon>
                :
                undefined
              }

              {(loginSelect.loginRole === 'Seller') ? <RefundIcon
                onClick={() => {
                  if (!loginStatus) {
                    dispatch(loginActions.loginPopup(true));
                  } else {
                    if (loginSelect.loginRole === 'Seller') {
                      navigate(routes.refund);
                    }
                  }
                }}
                className={styles.refund_icon}
              ></RefundIcon> : undefined}

              {(loginSelect.loginRole === 'Admin') ? <PolicyIcon
                onClick={() => {
                  if (!loginStatus) {
                    dispatch(loginActions.loginPopup(true));
                  } else {
                    if (loginSelect.loginRole === 'Admin') {
                      navigate(routes.policy);
                    }
                  }
                }}
                className={styles.policyIcon}
              ></PolicyIcon> : undefined}

              {(loginSelect.loginRole === 'Seller' || loginSelect.loginRole === 'Admin') ? <GraphIcon
                onClick={() => {
                  if (!loginStatus) {
                    dispatch(loginActions.loginPopup(true));
                  } else {
                    if (loginSelect.loginRole === 'Seller') {
                      navigate('/static');
                    }

                    if (loginSelect.loginRole === 'Admin') {
                      navigate(routes.profit);
                    }
                  }
                }}
                className={styles.graphIcon}
              ></GraphIcon> : undefined}

              {loginStatus && (
                <LogoutIcon
                  className={styles.logoutIcon}
                  onClick={() => {
                    navigate('/');
                    dispatch(loginActions.logoutRequest());
                  }}
                ></LogoutIcon>
              )}
              {/* <MessageIcon
                className={styles.messageIcon}
                onClick={() => {
                  if (!loginStatus) {
                    dispatch(loginActions.loginPopup(true));
                  } else {
                    navigate('/message');
                  }
                }}
              ></MessageIcon> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HeaderFloating;
