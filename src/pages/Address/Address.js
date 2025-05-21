import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Address.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { addressSelector } from '../../redux/selectors/accountSelector/AddressSelector';
import { addressActions } from '../../redux/actions/account/AddressActions';
import { notificationActions } from '../../redux/actions/notification/notificationAction';

function Address() {
  const dispatch = useDispatch();
  const addressSelect = useSelector(addressSelector);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const addressRef = useRef([]);
  const [currentAddress, setCurrentAddress] = useState();
  const [currentId, setCurrentId] = useState();

  const handleStopFocus = useCallback(() => {
    setName('');
    setCompany('');
    setAddress1('');
    setAddress2('');
    setCity('');
    setCountry('');
    setPhoneNumber('');

    if (typeof currentAddress === 'number') {
      addressRef.current[currentAddress].classList.remove(`${styles.focus}`);
      setCurrentAddress(undefined);
    }
  }, [currentAddress]);

  useEffect(() => {
    if (addressSelect.addressList) {
      setData(addressSelect.addressList);
    }
  }, [addressSelect.addressList]);

  useEffect(() => {
    dispatch(addressActions.getAddressRequest());
  }, [dispatch]);

  useEffect(() => {
    if (addressSelect.success) {
      dispatch(addressActions.getAddressRequest());
    }
  }, [addressSelect.success, dispatch]);

  const handleSubmit = useCallback(() => {
    if (!name.trim()) {
      dispatch(notificationActions.setNotificationContent('Please enter your name.'));
      return;
    }
    if (!address1.trim()) {
      dispatch(notificationActions.setNotificationContent('Please enter Address1.'));
      return;
    }
    if (!phoneNumber.trim()) {
      dispatch(notificationActions.setNotificationContent('Please enter your phone number.'));
      return;
    }
    dispatch(
      addressActions.createAddressRequest({
        name: name.trim(),
        company: company.trim(),
        address1: address1.trim(),
        address2: address2.trim(),
        city: city.trim(),
        country: country.trim(),
        phoneNumber: phoneNumber.trim(),
      })
    );
  }, [address1, address2, city, company, country, dispatch, name, phoneNumber]);

  const handleDelete = useCallback((id) => {
    dispatch(addressActions.deleteAddressRequest({ id: id }));
  }, [dispatch]);

  const handleEdit = useCallback((id) => {
    if (!name.trim()) {
      dispatch(notificationActions.setNotificationContent('Please enter your name.'));
      return;
    }
    if (!address1.trim()) {
      dispatch(notificationActions.setNotificationContent('Please enter Address1.'));
      return;
    }
    if (!phoneNumber.trim()) {
      dispatch(notificationActions.setNotificationContent('Please enter your phone number.'));
      return;
    }
    dispatch(
      addressActions.editAddressRequest({
        id: id,
        name: name.trim(),
        company: company.trim(),
        address1: address1.trim(),
        address2: address2.trim(),
        city: city.trim(),
        country: country.trim(),
        phoneNumber: phoneNumber.trim(),
      })
    );
  }, [address1, address2, city, company, country, dispatch, name, phoneNumber]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>Your Address</div>
        </div>
        <div className={styles.content}>
          <div className={styles.default}>
            <div className={styles.default_header}>Default</div>
            <div className={styles.default_content}>
              <div className={styles.addresses}>
                {data.length !== 0 ? (
                  data.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <div
                          className={styles.addresses_wrapper}
                          key={index}
                          ref={(element) => {
                            addressRef.current[index] = element;
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
                        <div className={styles.address_button_wrapper}>
                          <MainButton
                            title="EDIT"
                            className={styles.address_button}
                            onClick={() => {
                              setName(item.name);
                              setCompany(item.company);
                              setAddress1(item.address1);
                              setAddress2(item.address2);
                              setCity(item.city);
                              setCountry(item.country);
                              setPhoneNumber(item.phoneNumber);

                              addressRef.current[index].classList.add(`${styles.focus}`);
                              setCurrentAddress(index);
                              setCurrentId(item.id);
                            }}
                          ></MainButton>
                          <MainButton
                            title="DELETE"
                            className={styles.address_button}
                            onClick={() => {
                              handleStopFocus();
                              handleDelete(item.id);
                            }}
                          ></MainButton>
                        </div>
                      </Fragment>
                    );
                  })
                ) : (
                  <div className={styles.notification}>
                    You don't have any address, please create one
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.add_new}>
            <div className={styles.add_new_header}>Add a New Address</div>
            <div className={styles.add_new_content}>
              <div className={styles.input}>
                <div className={styles.input_header}>Name</div>
                <input
                  className={styles.input_bar}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.input}>
                <div className={styles.input_header}>Company</div>
                <input
                  className={styles.input_bar}
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.input}>
                <div className={styles.input_header}>Address1</div>
                <input
                  className={styles.input_bar}
                  value={address1}
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.input}>
                <div className={styles.input_header}>Address2</div>
                <input
                  className={styles.input_bar}
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.input}>
                <div className={styles.input_header}>City</div>
                <input
                  className={styles.input_bar}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.input}>
                <div className={styles.input_header}>Country</div>
                <input
                  className={styles.input_bar}
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                ></input>
              </div>
              <div className={styles.input}>
                <div className={styles.input_header}>Phone Number</div>
                <input
                  className={styles.input_bar}
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className={styles.add_new_footer}>
              {currentAddress === undefined && (
                <MainButton
                  className={styles.button}
                  title="ADD ADDRESS"
                  onClick={handleSubmit}
                ></MainButton>
              )}
              {currentAddress !== undefined && (
                <Fragment>
                  <MainButton
                    className={styles.button}
                    title="SAVE"
                    onClick={() => {
                      handleEdit(currentId);
                      handleStopFocus();
                    }}
                  ></MainButton>
                  <MainButton
                    className={styles.button}
                    title="CANCEL"
                    onClick={handleStopFocus}
                  ></MainButton>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
