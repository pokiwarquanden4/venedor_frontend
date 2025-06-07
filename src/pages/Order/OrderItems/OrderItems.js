import { Fragment, useEffect, useState } from 'react';
import styles from './OrderItems.module.scss';
import MainButton from '../../../components/MainButton/MainButton';
import Popup from '../../../components/Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { historyActions } from '../../../redux/actions/purchase/historyActions';
import { formatVND } from '../../../config/utils';
import { LoginSelector } from '../../../redux/selectors/accountSelector/LoginSelector';

function OrderItems({ data, upperData }) {
  const dispatch = useDispatch();
  const loginSelect = useSelector(LoginSelector)
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
        <td className={styles.content_content}>{data.id}</td>
        <td className={styles.content_content}>
          <img alt='' src={upperData.imgURL} style={{ width: '100%' }}></img>
        </td>
        <td className={styles.content_content}>{upperData.productName}</td>
        <td className={styles.content_content}>
          <div>
            <span>{data.number}</span> x <span>{formatVND(upperData.price)}</span>
          </div>
          <div>= <span className={styles.total_price}>{formatVND(data.number * upperData.price)}</span></div>
        </td>
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
            <option value="0" disabled={
              !(loginSelect.loginRole === "Seller" || (loginSelect.loginRole === "Stocker" && [0, 1, 3].includes(Number(status))))
            }>Chờ xử lý</option>
            <option value="1" disabled={
              !(loginSelect.loginRole === "Seller" || (loginSelect.loginRole === "Stocker" && [0, 1, 3].includes(Number(status))))
            }>Đang giao</option>
            <option value="2" disabled={
              !(loginSelect.loginRole === "Seller" || (loginSelect.loginRole === "Shipper" && [2, 3].includes(Number(status))))
            }>Hoàn thành</option>
            <option value="3" disabled={
              !(loginSelect.loginRole === "Seller" || (loginSelect.loginRole === "Stocker" && [0, 1, 3].includes(Number(status))) || (loginSelect.loginRole === "Shipper" && [2, 3].includes(Number(status))))
            }>Đã hủy</option>
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
            title="Địa chỉ"
          ></MainButton>
        </td>
      </tr>
    </Fragment>
  );
}

export default OrderItems;
