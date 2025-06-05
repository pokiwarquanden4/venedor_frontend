import { useDispatch } from 'react-redux';
import styles from './CartPopUpItem.module.scss';
import { cartActions } from '../../../redux/actions/product/cartActions';
import { formatVND } from '../../../config/utils';
import { notificationActions } from '../../../redux/actions/notification/notificationAction';

function CartPopUpItem({ data }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.cart_item}>
      <div
        className={styles.cart_item_x}
        onClick={() => {
          dispatch(cartActions.deleteCartProductRequest({ cartId: data.cartId, id: data.id }));
        }}
      >
        x
      </div>
      <img alt='' src={data.imgURL} className={styles.item_img}></img>
      <div className={styles.item_content}>
        <div className={styles.item_name}>
          {data.productName}
          {data.specific && data.specific.option1 && ` - ${data.specific.option1}`}
          {data.specific && data.specific.option2 && ` - ${data.specific.option2}`}
        </div>
        <div className={styles.item_price}>
          {data.cartQuantity}
          <span className={styles.item_price_X}>x</span>
          <span className={styles.item_price_price}>
            {data.specific
              ?
              formatVND(data.specific.price - data.specific.price * (data.specific.saleOff / 100))
              :
              formatVND(data.price - data.price * (data.saleOff / 100))
            }
          </span>
        </div>
        <div className={styles.item_number}>
          <div
            className={styles.decrease}
            onClick={() => {
              if (data.cartQuantity > 1) {
                dispatch(cartActions.editCartProductRequest({ quantity: data.cartQuantity - 1, id: data.id, specificId: data.specific && data.specific.id }));
              }
            }}
          >
            -
          </div>
          <div className={styles.current_number}>{data.cartQuantity}</div>
          <div
            className={styles.increase}
            onClick={() => {
              if ((data.specific ? data.specific.number : data.number) > data.cartQuantity) {
                dispatch(cartActions.editCartProductRequest({ quantity: data.cartQuantity + 1, id: data.id, specificId: data.specific && data.specific.id }));
              } else {
                dispatch(notificationActions.setNotificationContent('Chỉ còn ' + (data.specific ? data.specific.number : data.number) + ' sản phẩm trong kho'));
              }
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPopUpItem;
