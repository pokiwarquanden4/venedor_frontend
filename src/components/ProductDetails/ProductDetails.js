import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
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
import Popup from '../Popup/Popup';
import Comment from '../Comment/Comment';
import { productActions } from '../../redux/actions/product/ProductActions';
import Pagination from '../Pagination/Pagination';
import { formatVND } from '../../config/utils';

function ProductDetails({ data, fullScreen, preview }) {
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
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 4,
    productId: data.id
  })
  const [productData, setProductData] = useState(data)
  const [specificData, setSpecificData] = useState([])
  const [specificDatapics, setSpecificDatapics] = useState([])
  const [selectedSpecific, setSelectedSpecific] = useState({})
  const [commentData, setCommentData] = useState(productSelect.productComments)

  useEffect(() => {
    const newData = {
      ...data
    }

    const [option1, option2] = Object.keys(selectedSpecific).map(key => {
      const value = selectedSpecific[key]
      return specificData.find(spe => spe.specificName === key).specific[value]
    })

    let newImgList = []
    specificDatapics.forEach(item => {
      if (
        (item.option1 === option1 && item.option2 === option2)
        ||
        (item.option2 === option1 && item.option1 === option2)
        ||
        (item.option1 === option1 && !item.option2)
      ) {
        newImgList = item.listImgURL.split('___')
      }
    })

    if (newImgList.length) {
      newData.listImgURL = newImgList
    }

    setProductData(newData)
  }, [data, selectedSpecific, specificData, specificDatapics])

  useEffect(() => {
    setPageData(pre => {
      return {
        ...pre,
        productId: productData.id
      }
    })
  }, [productData])

  useEffect(() => {
    if (!productData.StorageSpecifics) return
    const selected = {}
    const specificData = productData.StorageSpecifics.map((item) => {
      selected[item.specificName] = 0

      return {
        specificName: item.specificName,
        specific: item.specific.split('___')
      }
    })

    setSelectedSpecific(selected)
    setSpecificData(specificData)
  }, [productData.StorageSpecifics])

  useEffect(() => {
    if (!productData.StorageSpecificPics) return

    setSpecificDatapics(productData.StorageSpecificPics)
  }, [productData.StorageSpecificPics])

  useEffect(() => {
    dispatch(productActions.getCommentRequest({ page: pageData.page, limit: pageData.limit, productId: pageData.productId }));
  }, [dispatch, pageData])

  useEffect(() => {
    setCommentData({
      ...productSelect.productComments
    })
  }, [productSelect.productComments])

  useEffect(() => {
    if (zoomRef.current && imgRef.current && zoomRef.current.length) {
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
      const value = loginSelect.wishList.find((e) => e.productId == productData.id);
      if (value) {
        setHeart(true);
        setWishListId(value.id);
      } else {
        setHeart(false);
        setWishListId(undefined);
      }
    }
  }, [productData.id, loginSelect.wishList]);

  const edit = useMemo(() => {
    if (!loginSelect.userData) return
    return data.sellerId === loginSelect.userData.id
  }, [data.sellerId, loginSelect.userData])

  return (
    <div className={styles.container}>
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
              {productData.listImgURL.map((item, index) => {
                return (
                  <div key={index} className={styles.pictures_wrapper}>
                    <img
                      alt=''
                      src={item}
                      className={`${styles.pictures} ${index + 1 === currentPic ? styles.chosen : ''
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
                    (productData.listImgURL.length - 1)
                    ? currentPicPreview + 7
                    : productData.listImgURL.length - 1
                ].scrollIntoView({
                  behavior: 'smooth',
                  inline: 'start',
                  block: 'nearest',
                });
                setCurrentPicPreview(
                  currentPicPreview + 7 <=
                    (productData.listImgURL.length - 1)
                    ? currentPicPreview + 7
                    : productData.listImgURL.length - 1
                );
              }}
            >
              <DownArrowIcon className={styles.icon_down}></DownArrowIcon>
            </div>
          </div>
          <div className={styles.picture}>
            <div className={styles.preview_pictures}>
              {productData.listImgURL.map((item, index) => {
                return (
                  <div
                    className={styles.preview_pictures_wrapper}
                    ref={(element) => {
                      zoomRef.current[index] = element;
                    }}
                    key={index}
                  >
                    <img
                      alt=''
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
            <p className={styles.header}>{productData.productName}</p>
          </div>
          <div className={styles.stock}>Availability: {productData.number}</div>
          <div className={styles.price}>
            <div className={styles.olePrice} style={productData.saleOff === 0 ? { display: 'none' } : {}}>
              {formatVND(productData.price)}
            </div>
            <div className={styles.newPrice}>{formatVND(productData.price - productData.price * (productData.saleOff / 100))}</div>
          </div>
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
                  if (number + 1 <= productData.number) {
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
                  navigate(`/accountSeller/${productData.id}`);
                } else {
                  dispatch(
                    cartActions.createCartProductRequest({
                      id: productData.id,
                      quantity: number,
                      specific: Object.keys(selectedSpecific).map(key => specificData.find(d => d.specificName === key)?.specific[selectedSpecific[key]]).join(" - ")
                    })
                  );
                }
              }}
            ></MainButton>
            <div
              className={`${!(preview || !role)
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
                      dispatch(wishListActions.createWishListRequest({ productId: productData.id }));
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
                        sellerId: productData.sellerId,
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
          {
            specificData.map((item, index) => {
              return <div key={index} className={styles.specifics}>
                <div className={styles.specifics_header}>{item.specificName}</div>
                <div className={styles.specifics_contents}>
                  {
                    item.specific.map((s, index) => {
                      const selected = selectedSpecific[item.specificName] === index
                      return <div
                        key={index}
                        onClick={() => setSelectedSpecific(preVal => {
                          return {
                            ...preVal,
                            [item.specificName]: index
                          }
                        })}
                        className={`${styles.specifics_content} ${selected ? styles.selected : ''}`}
                      >
                        <div className={styles.specifics_content_text}>{s}</div>
                        <div className={styles.specifics_content_pic}></div>
                      </div>
                    })
                  }
                </div>
              </div>
            })
          }
          {fullScreen ? <p className={styles.details} onClick={() => setIsShowDetails(true)} dangerouslySetInnerHTML={{ __html: productData.description }} /> : undefined}
          {/* {fullScreen && (
            <div className={styles.guaranteed}>
              <div className={styles.guaranteed_header}>Guaranteed Safe Checkout</div>
              <div className={styles.guaranteed_img_wrapper}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0438/9070/4538/files/payment-info.jpg?v=1614352859"
                  className={styles.guaranteed_img}
                ></img>
              </div>
            </div>
          )} */}
        </div>

        {fullScreen && isShowDetails ? (
          <Popup
            onClick={() => {
              setIsShowDetails(false)
            }}
            highestZIndex={true}
          >
            <p style={{ padding: '20px' }} onClick={() => setIsShowDetails(true)} dangerouslySetInnerHTML={{ __html: productData.description }} />
          </Popup>
        ) : undefined}
      </div>
      {
        fullScreen && commentData && commentData.comments
          ?
          <Fragment>
            {commentData.comments.map((comment) => {
              return <Comment key={comment.id} data={comment}></Comment>
            })}
            <div className={styles.pages}>
              <Pagination pageData={pageData} setPageData={setPageData} totalPages={commentData.totalPages}></Pagination>
            </div>
          </Fragment>
          :
          undefined
      }

    </div>
  );
}

export default ProductDetails;
