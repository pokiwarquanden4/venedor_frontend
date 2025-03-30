import { Fragment, useEffect, useState } from 'react';
import styles from './OrderItems.module.scss';
import MainButton from '../../../components/MainButton/MainButton';
import Popup from '../../../components/Popup/Popup';
import { useDispatch } from 'react-redux';
import { historyActions } from '../../../redux/actions/purchase/historyActions';

function OrderItems({ data, upperData }) {
  const dispatch = useDispatch();
  const [addressPopup, setAddressPopup] = useState(false);
  const [status, setStatus] = useState(data.status);

  useEffect(() => {
    setStatus(data.status);
  }, [data]);

  return (
    <Fragment>
      {addressPopup && (
        <Popup
          height="auto"
          onClick={() => {
            setAddressPopup(false);
          }}
        >
          <div className={styles.address_wrapper}>
            <div className={styles.addresses}>
              <div className={styles.addresses_content}>{data.Address.name}</div>
              <div className={styles.addresses_content}>{data.Address.company}</div>
              <div className={styles.addresses_content}>{data.Address.address1}</div>
              <div className={styles.addresses_content}>{data.Address.address2}</div>
              <div className={styles.addresses_content}>
                {data.Address.city} {data.Address.phoneNumber}
              </div>
              <div className={styles.addresses_content}>{data.Address.country}</div>
            </div>
          </div>
        </Popup>
      )}
      <tr>
        <td className={styles.content_content}>
          <img alt='' src={upperData.imgURL} style={{ width: '100%' }}></img>
        </td>
        <td className={styles.content_content}>{upperData.productName}</td>
        <td className={styles.content_content}>{data.number}</td>
        <td className={styles.content_content}>{data.number * upperData.price}$</td>
        <td className={styles.content_content}>
          <select
            className={styles.dropdown_input}
            value={status}
            onChange={(e) => {
              if (status != '3') {
                dispatch(
                  historyActions.editOrderRequest({
                    number: data.number,
                    productId: upperData.id,
                    status: e.target.value,
                    historyId: data.id,
                  })
                );
                setStatus(e.target.value);
              }
            }}
          >
            <option value="0">Pending</option>
            <option value="1">Shipping</option>
            <option value="2">Done</option>
            <option value="3">Cancel</option>
          </select>
        </td>
        <td className={styles.content_content}>
          {new Date(data.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </td>
        <td className={styles.content_content}>
          {new Date(data.updatedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </td>
        <td className={styles.content_content}>
          <MainButton
            onClick={() => {
              setAddressPopup(true);
            }}
            className={styles.button}
            title="See Address"
          ></MainButton>
        </td>
      </tr>
    </Fragment>
  );
}

export default OrderItems;
