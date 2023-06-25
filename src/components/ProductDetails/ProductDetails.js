import { useEffect, useRef, useState } from 'react';
import {
  CompareIcon,
  DownArrowIcon,
  HeartIcon,
  UpArrowIcon,
  ZaloIcon,
} from '../../asset/img/ItemsIcon';
import styles from './ProductDetails.module.scss';
import MainButton from '../MainButton/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../redux/actions/account/LoginActions';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';
import { useNavigate } from 'react-router-dom';
import { wishListActions } from '../../redux/actions/product/wishListActions';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';
import { cartActions } from '../../redux/actions/product/cartActions';
import { messageActions } from '../../redux/actions/message/messageActions';

function ProductDetails({ data, fullScreen, listImg, edit, preview }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSelect = useSelector(LoginSelector);
  const productSelect = useSelector(productSelector);
  const [currentPic, setCurrentPic] = useState(1);
  const [number, setNumber] = useState(1);
  const imgRef = useRef([]);
  const zoomRef = useRef([]);
  const previewRef = useRef([]);
  const [currentPicPreview, setCurrentPicPreview] = useState(0);
  const [heart, setHeart] = useState(false);
  const [wishListId, setWishListId] = useState();
  const role = loginSelect.loginRole === 'User';

  useEffect(() => {
    if (zoomRef.current && imgRef.current) {
      zoomRef.current[currentPic - 1].addEventListener('mousemove', (e) => {
        const x = e.clientX - zoomRef.current[currentPic - 1].getBoundingClientRect().left;
        const y = e.clientY - zoomRef.current[currentPic - 1].getBoundingClientRect().top;

        imgRef.current[currentPic - 1].style.transformOrigin = `${x}px ${y}px`;
        imgRef.current[currentPic - 1].style.transform = 'scale(3)';
      });

      zoomRef.current[currentPic - 1].addEventListener('mouseleave', () => {
        imgRef.current[currentPic - 1].style.transform = 'scale(1)';
      });
    }
  }, [currentPic]);

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
    <div className={`${styles.wrapper} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.picture_wrapper}>
        <div className={styles.picture_list}>
          <div
            className={styles.arrow_up}
            onClick={() => {
              previewRef.current[
                currentPicPreview - 7 >= 0 ? currentPicPreview - 7 : 0
              ].scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
              });
              setCurrentPicPreview(currentPicPreview - 7 >= 0 ? currentPicPreview - 7 : 0);
            }}
          >
            <UpArrowIcon className={styles.icon_up}></UpArrowIcon>
          </div>
          <div className={styles.picture_list_content}>
            {(data.listImgURL || listImg).map((item, index) => {
              return (
                <div key={index} className={styles.pictures_wrapper}>
                  <img
                    src={item}
                    className={`${styles.pictures} ${
                      index + 1 === currentPic ? styles.chosen : ''
                    }`}
                    ref={(element) => {
                      previewRef.current[index] = element;
                    }}
                    onClick={() => {
                      imgRef.current[index].scrollIntoView({
                        behavior: 'smooth',
                        inline: 'start',
                        block: 'nearest',
                      });
                      setCurrentPic(index + 1);
                    }}
                  ></img>
                </div>
              );
            })}
          </div>
          <div
            className={styles.arrow_down}
            onClick={() => {
              previewRef.current[
                currentPicPreview + 7 <=
                (data.listImgURL ? data.listImgURL.length - 1 : listImg.length - 1)
                  ? currentPicPreview + 7
                  : data.listImgURL
                  ? data.listImgURL.length - 1
                  : listImg.length - 1
              ].scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
              });
              setCurrentPicPreview(
                currentPicPreview + 7 <=
                  (data.listImgURL ? data.listImgURL.length - 1 : listImg.length - 1)
                  ? currentPicPreview + 7
                  : data.listImgURL
                  ? data.listImgURL.length - 1
                  : listImg.length - 1
              );
            }}
          >
            <DownArrowIcon className={styles.icon_down}></DownArrowIcon>
          </div>
        </div>
        <div className={styles.picture}>
          <div className={styles.preview_pictures}>
            {(data.listImgURL || listImg).map((item, index) => {
              return (
                <div
                  className={styles.preview_pictures_wrapper}
                  ref={(element) => {
                    zoomRef.current[index] = element;
                  }}
                  key={index}
                >
                  <img
                    className={styles.preview_picture}
                    src={item}
                    ref={(element) => {
                      imgRef.current[index] = element;
                    }}
                  ></img>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.content_wrapper}>
        <div>
          <p className={styles.header}>{data.description}</p>
        </div>
        <div className={styles.stock}>Availability: {data.number}</div>
        <div className={styles.price}>
          <div className={styles.olePrice} style={data.saleOff === 0 ? { display: 'none' } : {}}>
            ${data.price}
          </div>
          <div className={styles.newPrice}>${data.price - data.price * (data.saleOff / 100)}</div>
        </div>
        <div className={styles.description}>{data.detailDescription}</div>
        <div className={styles.buyer}>
          <div className={styles.number}>
            <div
              className={styles.minus}
              onClick={() => {
                if (number - 1 > 0) {
                  setNumber(number - 1);
                }
              }}
            >
              -
            </div>
            <div className={styles.currentNumber}>{number}</div>
            <div
              className={styles.plus}
              onClick={() => {
                if (number + 1 <= data.number) {
                  setNumber(number + 1);
                }
              }}
            >
              +
            </div>
          </div>
          <MainButton
            title={edit ? 'EDIT ITEM' : 'ADD TO CART'}
            className={styles.cart}
            disable={edit ? false : preview || !role}
            onClick={() => {
              if (!loginSelect.login) {
                dispatch(loginActions.loginPopup(true));
              }
              if (edit) {
                navigate(`/accountSeller/${data.id}`);
              } else {
                dispatch(
                  cartActions.createCartProductRequest({
                    id: data.id,
                    quantity: number,
                  })
                );
              }
            }}
          ></MainButton>
          <div
            className={`${
              !(preview || !role)
                ? heart
                  ? styles.wishListFocus
                  : styles.wishList
                : styles.disable
            }`}
            onClick={
              !(preview || !role)
                ? () => {
                    if (!loginSelect.login) {
                      dispatch(loginActions.loginPopup(true));
                    }
                    if (heart) {
                      dispatch(wishListActions.deleteWishListRequest({ id: wishListId }));
                    } else {
                      dispatch(wishListActions.createWishListRequest({ productId: data.id }));
                    }
                  }
                : null
            }
          >
            <HeartIcon className={styles.heart_icon}></HeartIcon>
          </div>
          <div
            className={`${!(preview || !role) ? styles.compare : styles.disable}`}
            onClick={
              !(preview || !role)
                ? () => {
                    if (!loginSelect.login) {
                      dispatch(loginActions.loginPopup(true));
                    }
                  }
                : null
            }
          >
            <CompareIcon className={styles.compare_icon}></CompareIcon>
          </div>
        </div>
        {fullScreen && (
          <div className={styles.directCall}>
            <div
              className={styles.zaloCall}
              onClick={() => {
                if (loginSelect.loginRole === 'User') {
                  dispatch(
                    messageActions.createRoomChatRequest({
                      sellerId: data.sellerId,
                    })
                  );
                  navigate('/message');
                }
              }}
            >
              <ZaloIcon className={styles.zaloIcon}></ZaloIcon>
              <div className={styles.zaloCall_description}>Ask about this product</div>
            </div>
          </div>
        )}
        {fullScreen && (
          <div className={styles.guaranteed}>
            <div className={styles.guaranteed_header}>Guaranteed Safe Checkout</div>
            <div className={styles.guaranteed_img_wrapper}>
              <img
                src="https://cdn.shopify.com/s/files/1/0438/9070/4538/files/payment-info.jpg?v=1614352859"
                className={styles.guaranteed_img}
              ></img>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
