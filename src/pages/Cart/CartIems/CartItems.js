import { useDispatch } from 'react-redux';
import styles from './CartItems.module.scss';
import { cartActions } from '../../../redux/actions/product/cartActions';

function CartItems({ data }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.item}>
      <div style={{ backgroundImage: `url(${data.imgURL})` }} className={styles.item_img}></div>
      <div className={styles.itemBlock}>
        <div className={styles.item_description}>{data.description}</div>
        <div className={styles.item_wrapper}>
          <div className={styles.item_price}>
            ${(data.cartQuantity * (data.price - data.price * (data.saleOff / 100))).toFixed(2)}
          </div>
          <div className={styles.item_quantity}>
            <div className={styles.item_quantity_button}>
              <div
                className={styles.minus}
                onClick={() => {
                  if (data.cartQuantity > 1) {
                    dispatch(cartActions.editCartProductRequest({ quantity: -1, id: data.id }));
                  }
                }}
              >
                -
              </div>
              <div className={styles.currentNumber}>{data.cartQuantity}</div>
              <div
                className={styles.plus}
                onClick={() => {
                  if (data.number > data.cartQuantity) {
                    dispatch(cartActions.editCartProductRequest({ quantity: 1, id: data.id }));
                  }
                }}
              >
                +
              </div>
            </div>
            {data.number - data.cartQuantity < 0 ? (
              <div className={styles.notification}>We only have {data.number} left</div>
            ) : undefined}
          </div>
        </div>
      </div>
      <div
        className={styles.item_x_button}
        onClick={() => {
          dispatch(cartActions.deleteCartProductRequest({ id: data.id }));
        }}
      >
        x
      </div>
    </div>
  );
}

export default CartItems;
