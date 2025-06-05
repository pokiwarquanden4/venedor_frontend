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
  }, [dispatch, loginSelect.wishList]);

  useEffect(() => {
    if (wishListSelect.wishList) {
      setData(wishListSelect.wishList);
    }
  }, [wishListSelect.wishList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_content}>
        {/* Header với tiêu đề và nút xóa tất cả */}
        <div className={styles.header}>
          <div className={styles.header_content}>Danh sách mong muốn</div>
          <div
            className={styles.remove_content}
            onClick={() => {
              dispatch(wishListActions.deleteAllWishListRequest());
            }}
          >
            <TrashCanIcon className={styles.trashCan_icon} />
            <div className={styles.remove_title}>Xoá tất cả</div>
          </div>
        </div>

        {/* Nội dung danh sách các item */}
        <div className={styles.content}>
          <div className={styles.items}>
            {data.length !== 0 &&
              data.map((item, index) => (
                <Items
                  data={item}
                  key={index}
                  vertical={true}
                  wishList={true}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
