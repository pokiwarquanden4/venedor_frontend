import { useDispatch } from 'react-redux';
import styles from './CartItems.module.scss';
import { cartActions } from '../../../redux/actions/product/cartActions';
import { formatVND } from '../../../config/utils';
import { notificationActions } from '../../../redux/actions/notification/notificationAction';

function CartItems({ data }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.item}>
      <div style={{ backgroundImage: `url(${data.imgURL})` }} className={styles.item_img}></div>
      <div className={styles.itemBlock}>
        <div className={styles.item_description}>
          {data.productName}
          {data.specific && data.specific.option1 && ` - ${data.specific.option1}`}
          {data.specific && data.specific.option2 && ` - ${data.specific.option2}`}
        </div>
        <div className={styles.item_wrapper}>
          <div className={styles.item_price}>
            {formatVND(data.cartQuantity *
              (data.specific
                ?
                (data.specific.price - data.specific.price * (data.specific.saleOff / 100))
                :
                (data.price - data.price * (data.saleOff / 100)))
            )}
          </div>
          <div className={styles.item_quantity}>
            <div className={styles.item_quantity_button}>
              <div
                className={styles.minus}
                onClick={() => {
                  if (data.cartQuantity > 1) {
                    dispatch(cartActions.editCartProductRequest({ quantity: data.cartQuantity - 1, id: data.id, specificId: data.specific && data.specific.id }));
                  }
                }}
              >
                -
              </div>
              <div className={styles.currentNumber}>{data.cartQuantity}</div>
              <div
                className={styles.plus}
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
            {(data.specific ? data.specific.number : data.number) - data.cartQuantity < 0 ? (
              <div className={styles.notification}>Chỉ còn {(data.specific ? data.specific.number : data.number)} sản phẩm trong kho</div>
            ) : undefined}
          </div>
        </div>
      </div>
      <div
        className={styles.item_x_button}
        onClick={() => {
          dispatch(cartActions.deleteCartProductRequest({ cartId: data.cartId, id: data.id }));
        }}
      >
        x
      </div>
    </div>
  );
}

export default CartItems;
