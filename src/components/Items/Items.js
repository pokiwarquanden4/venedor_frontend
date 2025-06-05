import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  CompareIcon,
  HeartFillIcon,
  HeartIcon,
  PackICon,
  SearchIcon,
} from '../../asset/img/ItemsIcon';
import styles from './Items.module.scss';
import Popup from '../Popup/Popup';
import ProductDetails from '../ProductDetails/ProductDetails';
import MainButton from '../MainButton/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';
import { loginActions } from '../../redux/actions/account/LoginActions';
import Img from '../Img/Img';
import { wishListActions } from '../../redux/actions/product/wishListActions';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../redux/actions/product/cartActions';
import { formatVND } from '../../config/utils';
import { notificationActions } from '../../redux/actions/notification/notificationAction';

function Items({ data, vertical, wishList, edit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSelect = useSelector(LoginSelector);
  const [heart, setHeart] = useState(false);
  const [wishListId, setWishListId] = useState();
  const [specificData, setSpecificData] = useState([])
  const [selectedSpecific, setSelectedSpecific] = useState({})
  const role = loginSelect.loginRole === 'User';

  const handleDelete = useCallback(() => {
    dispatch(wishListActions.deleteWishListRequest({ id: wishListId }));
  }, [dispatch, wishListId]);

  useEffect(() => {
    if (loginSelect.wishList) {
      const value = loginSelect.wishList.find((e) => e.productId === data.id);
      if (value) {
        setHeart(true);
        setWishListId(value.id);
      } else {
        setHeart(false);
        setWishListId(undefined);
      }
    }
  }, [loginSelect.wishList, data]);

  useEffect(() => {
    if (!data.StorageSpecifics) return
    const selected = {}
    const specificData = data.StorageSpecifics.map((item) => {
      selected[item.specificName] = 0

      return {
        specificName: item.specificName,
        specific: item.specific.split('___')
      }
    })

    setSelectedSpecific(selected)
    setSpecificData(specificData)
  }, [data.StorageSpecifics])

  return (
    <Fragment>
      <div className={`${styles.item} ${vertical ? styles.vertical : styles.horizontal}`}>
        <div className={styles.item_img}>
          {vertical && loginSelect.loginRole === 'User' && (
            <div className={styles.heartIcon}>
              {!wishList && !heart && (
                <HeartIcon
                  className={`${styles.heart} ${heart ? styles.heartFill : ''}`}
                  onClick={() => {
                    dispatch(wishListActions.createWishListRequest({ productId: data.id }));
                  }}
                ></HeartIcon>
              )}
              {!wishList && heart && (
                <HeartFillIcon
                  className={`${styles.heart} ${heart ? styles.heartFill : ''}`}
                  onClick={handleDelete}
                ></HeartFillIcon>
              )}
              {wishList && (
                <div className={styles.xIcon} onClick={handleDelete}>
                  X
                </div>
              )}
            </div>
          )}
          {data.saleOff ? (
            <div className={styles.discount}>
              <div className={styles.discount_content}>{data.saleOff}%</div>
            </div>
          ) : null}
          <Img
            vertical={vertical}
            className={styles.img}
            imgUrl={data.imgURL}
            onClick={() => {
              navigate(`/category/${data.categoryId}/${data.id}`);
            }}
          ></Img>
          <Img vertical={vertical} className={styles.imgHover} imgUrl={data.listImgURL[0] || data.imgURL}></Img>
        </div>
        <div className={styles.item_content}>
          {data.brandName ? <div className={styles.brand_name}>{data.brandName}</div> : undefined}
          <div className={styles.item_description}>{data.productName}</div>
          <div className={styles.prices}>
            {data.price !== data.price - data.price * (data.saleOff / 100) ? <div className={styles.old_price}>{formatVND(data.price)}</div> : undefined}
            <div className={styles.new_price}>
              {formatVND(data.price - data.price * (data.saleOff / 100))}
            </div>
          </div>
          {data.saleOff ? <div className={styles.saving}>Bạn tiết kiệm {data.saleOff}%</div> : null}
        </div>
      </div>
    </Fragment>
  );
}

export default Items;
