import { useDispatch } from 'react-redux';
import styles from './CartPopUpItem.module.scss';
import { cartActions } from '../../../redux/actions/product/cartActions';
import { formatVND } from '../../../config/utils';

function CartPopUpItem({ data }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.cart_item}>
      <div
        className={styles.cart_item_x}
        onClick={() => {
          dispatch(cartActions.deleteCartProductRequest({ id: data.id }));
        }}
      >
        x
      </div>
      <img src={data.imgURL} className={styles.item_img}></img>
      <div className={styles.item_content}>
        <div className={styles.item_name}>{data.productName} - {data.specific}</div>
        <div className={styles.item_price}>
          {data.cartQuantity}
          <span className={styles.item_price_X}>x</span>
          <span className={styles.item_price_price}>
            {formatVND(data.price - data.price * (data.saleOff / 100))}
          </span>
        </div>
        <div className={styles.item_number}>
          <div
            className={styles.decrease}
            onClick={() => {
              if (data.cartQuantity > 1) {
                dispatch(cartActions.editCartProductRequest({ quantity: -1, id: data.id, specific: data.specific }));
              }
            }}
          >
            -
          </div>
          <div className={styles.current_number}>{data.cartQuantity}</div>
          <div
            className={styles.increase}
            onClick={() => {
              if (data.number > data.cartQuantity) {
                dispatch(cartActions.editCartProductRequest({ quantity: 1, id: data.id, specific: data.specific }));
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
