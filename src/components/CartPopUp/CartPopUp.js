import { Fragment, useEffect, useState } from 'react';
import styles from './CartPopUp.module.scss';
import MainButton from '../MainButton/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../redux/selectors/productSelector/cartSelector';
import { cartActions } from '../../redux/actions/product/cartActions';
import CartPopUpItem from './CartPopUpItem/CartPopUpItem';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';
import { useNavigate } from 'react-router-dom';
import { formatVND } from '../../config/utils';

function CartPopUp() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const cartSelect = useSelector(cartSelector);
  const loginSelect = useSelector(LoginSelector);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    //Orginal
    let temp = 0;

    data.forEach((item) => {
      const unitPrice = item.specific ? item.specific.price : item.price;
      temp += item.cartQuantity * unitPrice;
    });
    setOriginalPrice(temp);

    //Discount
    temp = 0;
    data.forEach((item) => {
      if (item.saleOff) {
        const unitPrice = item.specific ? item.specific.price : item.price;
        const unitSaleOff = item.specific ? item.specific.saleOff : item.saleOff;

        temp += item.cartQuantity * unitPrice * (unitSaleOff / 100);
      }
    });
    setDiscount(temp);

    //Total
    temp = 0;
    data.forEach((item) => {
      const unitPrice = item.specific ? item.specific.price : item.price;
      const unitSaleOff = item.specific ? item.specific.saleOff : item.saleOff;

      if (item.saleOff) {
        temp += item.cartQuantity * (unitPrice - unitPrice * (unitSaleOff / 100));
      } else {
        temp += item.cartQuantity * unitPrice;
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Giỏ hàng</div>
      {data.length !== 0 ? (
        <Fragment>
          <div className={styles.message}>Chúc mừng! Bạn đã được miễn phí vận chuyển</div>
          <div className={styles.items_number}>{data.length} sản phẩm trong giỏ hàng</div>
        </Fragment>
      ) : (
        <div className={styles.message}>Giỏ hàng của bạn đang trống.</div>
      )}
      <div className={styles.cart}>
        {data.length !== 0 &&
          data.map((item, index) => {
            return <CartPopUpItem data={item} key={index}></CartPopUpItem>;
          })}
      </div>
      <div className={styles.price}>
        <div className={styles.original}>
          <div className={styles.original_header}>Giá gốc</div>
          <div className={styles.original_price}>{formatVND(originalPrice)}</div>
        </div>
        <div className={styles.discount}>
          <div className={styles.discount_header}>Giảm giá</div>
          <div className={styles.discount_price}>{formatVND(discount)}</div>
        </div>
        <div className={styles.total}>
          <div className={styles.total_header}>Tổng cộng</div>
          <div className={styles.total_price}>{formatVND(total)}</div>
        </div>
      </div>
      <div className={styles.button}>
        <MainButton
          className={styles.view_cart_button}
          title="XEM GIỎ HÀNG"
          onClick={() => {
            if (loginSelect.loginRole === 'User') {
              navigate('/cart');
            }
          }}
        ></MainButton>
      </div>
    </div>
  );
}

export default CartPopUp;
