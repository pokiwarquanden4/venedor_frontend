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

function Items({ data, vertical, wishList, edit }) {
  if (data) {
    data = {
      ...data,
      listImgURL: data.listImgURL.split('_').slice(1),
    };
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSelect = useSelector(LoginSelector);
  const [heart, setHeart] = useState(false);
  const [popup, setPopup] = useState(false);
  const [wishListId, setWishListId] = useState();
  const role = loginSelect.loginRole === 'User';

  const handleDelete = useCallback(() => {
    dispatch(wishListActions.deleteWishListRequest({ id: wishListId }));
  });

  useEffect(() => {
    if (loginSelect.wishList) {
      const value = loginSelect.wishList.find((e) => e.productId == data.id);
      if (value) {
        setHeart(true);
        setWishListId(value.id);
      } else {
        setHeart(false);
        setWishListId(undefined);
      }
    }
  }, [loginSelect.wishList]);

  return (
    <Fragment>
      {popup && (
        <Popup
          onClick={() => {
            setPopup(false);
          }}
        >
          <ProductDetails
            heart={heart}
            edit={edit}
            wishListId={wishListId}
            data={data}
          ></ProductDetails>
        </Popup>
      )}
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
              navigate(`/category/${data.category}/${data.id}`);
            }}
          ></Img>
          <Img vertical={vertical} className={styles.imgHover} imgUrl={data.listImgURL[0] || data.imgURL}></Img>
          <div className={styles.img_button}>
            <div
              className={styles.searchButton}
              onClick={() => {
                setPopup(true);
              }}
            >
              <SearchIcon className={styles.icon}></SearchIcon>
            </div>
            <div
              className={styles.saveButton}
              onClick={() => {
                if (!loginSelect.login) {
                  dispatch(loginActions.loginPopup(true));
                }
                if (role) {
                  if (data.number > 0) {
                    dispatch(
                      cartActions.createCartProductRequest({
                        id: data.id,
                        quantity: 1,
                      })
                    );
                  }
                }
              }}
            >
              <PackICon className={styles.icon}></PackICon>
            </div>
            <div
              className={styles.compareButton}
              onClick={() => {
                if (!loginSelect.login) {
                  dispatch(loginActions.loginPopup(true));
                }
              }}
            >
              <CompareIcon className={styles.icon}></CompareIcon>
            </div>
          </div>
        </div>
        <div className={styles.item_content}>
          <div className={styles.brand_name}>{data.brandName}</div>
          <div className={styles.item_description}>{data.productName}</div>
          <div className={styles.prices}>
            {data.price && <div className={styles.old_price}>${data.price}</div>}
            <div className={styles.new_price}>
              ${data.price - data.price * (data.saleOff / 100)}
            </div>
          </div>
          {data.saleOff ? <div className={styles.saving}>you save {data.saleOff}%</div> : null}
        </div>
        {wishList && (
          <MainButton
            className={styles.add_to_cart}
            title="ADD TOO CART"
            onClick={() => {
              dispatch(
                cartActions.createCartProductRequest({
                  id: data.id,
                  quantity: 1,
                })
              );
            }}
          ></MainButton>
        )}
      </div>
    </Fragment>
  );
}

export default Items;
