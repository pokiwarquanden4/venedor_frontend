import styles from './WishList.module.scss';
import { TrashCanIcon } from '../../asset/img/WishListIcon';
import Items from '../../components/Items/Items';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';
import { wishListActions } from '../../redux/actions/product/wishListActions';
import { wishListSelector } from '../../redux/selectors/productSelector/wishListSelector';

function WishList() {
  const dispatch = useDispatch();
  const loginSelect = useSelector(LoginSelector);
  const wishListSelect = useSelector(wishListSelector);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (loginSelect.wishList) {
      dispatch(wishListActions.getWishListRequest({ data: loginSelect.wishList }));
    }
  }, [loginSelect.wishList]);

  useEffect(() => {
    if (wishListSelect.wishList) {
      setData(wishListSelect.wishList);
    }
  }, [wishListSelect.wishList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_content}>
        <div className={styles.header}>
          <div className={styles.header_content}>I Wish List</div>
          <div
            className={styles.remove_content}
            onClick={() => {
              dispatch(wishListActions.deleteAllWishListRequest());
            }}
          >
            <TrashCanIcon className={styles.trashCan_icon}></TrashCanIcon>
            <div className={styles.remove_title}>Remove All</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.items}>
            {data.length !== 0 &&
              data.map((item, index) => {
                return <Items data={item} key={index} vertical={true} wishList={true}></Items>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
