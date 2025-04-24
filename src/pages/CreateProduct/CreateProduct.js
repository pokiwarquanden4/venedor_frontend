import { useCallback, useEffect, useRef, useState } from 'react';
import BackGroundImg from '../../components/BackGroundImg/BackGroundImg';
import styles from './CreateProduct.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../redux/actions/product/ProductActions';
import Popup from '../../components/Popup/Popup';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import { useNavigate } from 'react-router-dom';
import {
  decodePrice,
  decodeSaleOff,
  quantityFilter,
  saleOffFilter,
} from '../../config/filterInput';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';
import routes from '../../config/routes';
import Select from "react-select";
import CreateProductSpecific from './createProductSpecific';
import { EditButton } from '../../asset/img/HeaderIcon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFirebaseImage } from '../../fireBase/imageUpload';
import { notificationActions } from '../../redux/actions/notification/notificationAction';
import CreateSpecificPics from './CreateSpecificPics';
import { loadingActions } from '../../redux/actions/loading/LoadingActions';

function CreateProduct() {
  const productSelect = useSelector(productSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [nameFill, setNameFill] = useState();
  const [price, setPrice] = useState();
  const [priceFill, setPriceFill] = useState();
  const [quantity, setQuantity] = useState();
  const [quantityFill, setQuantityFill] = useState();
  const [description, setDescription] = useState();
  const [descriptionFill, setDescriptionFill] = useState();
  const [saleOff, setSaleOff] = useState();
  const [saleOffFill, setSaleOffFill] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categoryIdFill, setCategoryIdFill] = useState();
  const [categoryDetailId, setCategoryDetailId] = useState()
  const [categoryDetailIdFill, setCategoryDetailIdFill] = useState()
  const [brand, setBrand] = useState();

  const [specific, setSpecific] = useState([])
  const [createSpecific, setCreateSpecific] = useState({
    specificName: '',
    specific: []
  })

  const [specificPics, setSpecificPics] = useState([])
  const [createSpecificPics, setCreateSpecificPics] = useState(undefined)

  const [popUpSpecific, setPopUpSpecific] = useState(false)
  const [popUpSpecificPics, setPopUpSpecificPics] = useState(false)

  const [mainImg, setMainImg] = useState();
  const [mainImgFill, setMainImgFill] = useState();

  const [listImg, setListImg] = useState([]);
  const [listImgFill, setListImgFill] = useState();

  const [preview, setPreview] = useState(false);
  const [combination, setCombination] = useState([])


  const checkinput = useCallback(() => {
    !name && setNameFill(true);
    !price && setPriceFill(true);
    (!quantity || !quantityFilter(quantity)) && setQuantityFill(true);
    saleOff && !saleOffFilter(saleOff) && setSaleOffFill(true);
    !categoryId && setCategoryIdFill(true)
    !categoryDetailId && setCategoryDetailIdFill(true)
    !description && setDescriptionFill(true);
    !mainImg && setMainImgFill(true);
    !listImg.length && setListImgFill(true);
    if (
      combination.length !== specificPics.filter(data => data.valid).length
    ) {
      dispatch(notificationActions.setNotificationContent('Please check specific'));
      return false
    }

    if (
      !nameFill &&
      !priceFill &&
      !descriptionFill &&
      !categoryIdFill &&
      !categoryDetailIdFill &&
      !quantityFill &&
      !saleOffFill &&
      !mainImgFill &&
      !listImgFill !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }, [categoryDetailId, categoryDetailIdFill, categoryId, categoryIdFill, combination.length, description, descriptionFill, dispatch, listImg.length, listImgFill, mainImg, mainImgFill, name, nameFill, price, priceFill, quantity, quantityFill, saleOff, saleOffFill, specificPics]);

  useEffect(() => {
    if (specificPics.length) {
      let sum = 0

      specificPics.forEach(data => sum += data.number)

      setPrice(0)
      setPriceFill(false)
      setSaleOff(0 + '%')
      setSaleOffFill(false)
      setQuantity(sum)
      setQuantityFill(false)
    }
  }, [specificPics])

  const handleSubmit = useCallback(async () => {
    if (checkinput()) {
      //upload img
      dispatch(loadingActions.setLoadingLoading(true))
      const mainImgUrl = await uploadFirebaseImage({
        location: 'mainImg'
      }, mainImg.file);

      const listImgUrl = []
      for (let i = 0; i < listImg.length; i++) {
        const url = await uploadFirebaseImage({
          location: 'listImg'
        }, listImg[i].file);

        listImgUrl.push(url)
      }

      const specificPicsData = await Promise.all(
        specificPics.map(async (item) => {
          const imgURL = []
          const data = item.img.map(d => d.file)

          for (let i = 0; i < data.length; i++) {
            const url = await uploadFirebaseImage({ location: 'listImg' }, data[i])
            imgURL.push(url)
          }

          return {
            combination: item.combination,
            img: imgURL,
            price: item.price,
            number: item.number,
            saleOff: item.saleOff,
          }
        })
      )

      const productData = {
        productName: name,
        price: decodePrice(price),
        description: description,
        number: quantity,
        saleOff: decodeSaleOff(saleOff),
        categoryId: categoryId,
        categoryDetailId: categoryDetailId,
        brandName: brand,
        specifics: specific,
        specificPics: specificPicsData,
        mainImgUrl: mainImgUrl,
        listImgUrl: listImgUrl
      };

      await dispatch(productActions.createProductRequest(productData));

      navigate(routes.accountSeller);
    }
  }, [brand, categoryId, categoryDetailId, checkinput, description, dispatch, listImg, mainImg, name, navigate, price, quantity, saleOff, specific, specificPics]);

  const generateCombinations = (specific) => {
    if (!specific.length) return []
    const lists = specific.map(item => item.specific);
    const names = specific.map(item => item.specificName);

    const cartesian = (arr) => {
      return arr.reduce((acc, curr) => {
        const res = [];
        acc.forEach(a => {
          curr.forEach(b => {
            res.push([...a, b]);
          });
        });
        return res;
      }, [[]]);
    };

    const rawCombinations = cartesian(lists);

    // Chuyển mảng thành đối tượng { Color: 'Red', Size: 'S', ... }
    return rawCombinations.map(combination => {
      const result = {};
      combination.forEach((value, index) => {
        result[names[index]] = value;
      });
      return result;
    });
  };

  useEffect(() => {
    const combinations = generateCombinations(specific)
    setCombination(combinations)
    setSpecificPics(combinations.map(item => {
      return {
        combination: item,
        img: [],
        price: 0,
        number: 0,
        saleOff: 0,
        valid: false,
      }
    }));
  }, [specific])

  const getReviewData = useCallback(() => {
    return {
      listImgURL: listImg,
      description: description,
      number: quantity,
      price: decodePrice(price),
      saleOff: decodeSaleOff(saleOff),
    };
  }, [description, listImg, price, quantity, saleOff]);

  const onSubmitSpecific = (data) => {
    if (data.index !== undefined) {
      setSpecific((pre) => {
        const newSpe = [...pre]
        newSpe[data.index] = {
          specificName: data.specificName,
          specific: data.specific
        }

        return newSpe
      })
    } else {
      setSpecific((pre) => {
        const newSpe = [...pre, {
          specificName: data.specificName,
          specific: data.specific
        }]

        return newSpe
      })
    }
  }

  const onSubmitSpecificPics = (data) => {
    setSpecificPics((pre) => {
      const newSpe = [...pre]
      newSpe[data.index].img = data.img
      newSpe[data.index].price = data.price
      newSpe[data.index].number = data.number
      newSpe[data.index].saleOff = data.saleOff
      newSpe[data.index].valid = true

      return newSpe
    })
  }

  const onDeleteSpecific = (index) => {
    setSpecific((prev) => prev.filter((_, i) => i !== index));
  };

  // Hàm để thêm ảnh vào listImg
  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => {
      return {
        file: file,
        url: URL.createObjectURL(file)
      }
    });

    setListImg((prevImages) => [...prevImages, ...newImages]);
    setListImgFill(false)
  };

  // Hàm để xóa ảnh khỏi listImg
  const removeFile = (index) => {
    setListImg((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>Create Product</div>
          <div className={styles.sub_header}>Create your own business</div>
        </div>
        <div className={styles.content}>
          <div className={styles.left_content}>
            <div className={styles.name}>
              <div className={styles.name_header}>Name</div>
              <input
                placeholder="Product Name"
                className={`${styles.name_input} ${nameFill ? styles.noInput : ''}`}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onFocus={(e) => {
                  setNameFill(false);
                }}
              ></input>
              {nameFill ? (
                <div className={styles.notification}>You need to fill in this blank</div>
              ) : undefined}
            </div>
            <div className={styles.price}>
              <div className={styles.price_header}>Price</div>
              <input
                disabled={specificPics.length ? true : false}
                placeholder="Price"
                value={price}
                className={`${styles.price_input} ${priceFill ? styles.noInput : ''}`}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                onFocus={(e) => {
                  setPriceFill(false);
                }}
              ></input>
              {priceFill ? (
                <div className={styles.notification}>
                  You need to fill in this blank (Ex: 1.000$, 10.000.000$)
                </div>
              ) : undefined}
            </div>
            <div className={styles.quantity}>
              <div className={styles.quantity_header}>Quantity</div>
              <input
                disabled={specificPics.length ? true : false}
                placeholder="Quantity"
                value={quantity}
                className={`${styles.quantity_input} ${quantityFill ? styles.noInput : ''}`}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                onFocus={(e) => {
                  setQuantityFill(false);
                }}
                onBlur={() => {
                  if (quantity) {
                    !quantityFilter(quantity) && setQuantityFill(true);
                  }
                }}
              ></input>
              {quantityFill ? (
                <div className={styles.notification}>You need to fill in this with a number</div>
              ) : undefined}
            </div>
            <div className={styles.description}>
              <div className={styles.description_header}>Description</div>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                onFocus={() => setDescriptionFill(false)}
                style={{ width: "400px", maxHeight: "500px", overflowY: "auto" }}
              />
              {descriptionFill ? <div className={styles.notification}>You need to fill in this blank</div> : undefined}
            </div>
            <div className={styles.saleOff}>
              <div className={styles.saleOff_header}>Sale Off</div>
              <input
                disabled={specificPics.length ? true : false}
                value={saleOff}
                placeholder="Sale Off"
                className={`${styles.saleOff_input} ${saleOffFill ? styles.noInput : ''}`}
                onChange={(e) => {
                  setSaleOff(e.target.value);
                }}
                onFocus={(e) => {
                  setSaleOffFill(false);
                }}
                onBlur={() => {
                  if (saleOff) {
                    !saleOffFilter(saleOff) && setSaleOffFill(true);
                  }
                }}
              ></input>
              {saleOffFill ? (
                <div className={styles.notification}>
                  You need to fill in this blank (1% to 100%)
                </div>
              ) : undefined}
            </div>
            <div className={styles.category}>
              <div className={styles.category_header}>Category</div>
              <select
                className={styles.category_input}
                onChange={(e) => {
                  setCategoryIdFill(false)
                  setCategoryId(e.target.value);
                }}
              >
                <option value={undefined}>None</option>
                {Object.keys(productSelect.category.category).map((key, index) => {
                  const item = productSelect.category.category[key]
                  return (
                    <option value={key} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {categoryIdFill ? (
                <div className={styles.notification}>
                  You need to select a category
                </div>
              ) : undefined}
            </div>
            <div className={styles.categoryList}>
              <div className={styles.categoryList_header}>Category Details</div>
              <select
                className={styles.category_input}
                onChange={(e) => {
                  setCategoryDetailIdFill(false)
                  setCategoryDetailId(e.target.value);
                }}
              >
                <option value={undefined}>None</option>
                {(productSelect.category.categoryDetails[categoryId] || []).map((data, index) => {
                  return (
                    <option value={data.id} key={index}>
                      {data.categoryName}
                    </option>
                  );
                })}
              </select>
              {categoryDetailIdFill ? (
                <div className={styles.notification}>
                  You need to select categories
                </div>
              ) : undefined}
            </div>
            <div className={styles.brand}>
              <div className={styles.brand_header}>Brand</div>
              <input
                placeholder="Brand name"
                className={`${styles.brand_input}`}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                onFocus={(e) => {
                  setNameFill(false);
                }}
              ></input>
            </div>
            <div className={styles.specific_wrapper}>
              <div className={styles.specific}>
                <div className={styles.specific_header}>Specific</div>
                <MainButton
                  onClick={() => {
                    if (specific.length === 2) {
                      dispatch(notificationActions.setNotificationContent('Only 2 specific allowed'));
                      return
                    }
                    setCreateSpecific({
                      index: undefined,
                      specificName: '',
                      specific: []
                    })
                    setPopUpSpecific(true)
                  }
                  }
                  className={styles.specific_button}
                  title={'Add Specific'}
                ></MainButton>
              </div>
              <div className={styles.specific_content}>
                {specific.map((item, index) => {
                  return <div key={index} className={styles.specific_values}>
                    <div className={styles.specific_content_header}>{item.specificName}</div>
                    <EditButton
                      width='16px'
                      className={styles.editButton}
                      onClick={() => {
                        setCreateSpecific({
                          index: index,
                          specificName: item.specificName,
                          specific: item.specific
                        })
                        setPopUpSpecific(true)
                      }}
                    ></EditButton>
                    <div className={styles.specific_content_values}>
                      {item.specific.map((value, index) => {
                        return <div key={index} className={styles.specific_content_value}>{value}</div>
                      })}
                    </div>
                  </div>
                })}
              </div>
              <div className={styles.specific_groups}>
                {combination.map((item, index) => {
                  const data = Object.values(item)

                  return <div key={index} className={styles.specific_values}>
                    <div className={styles.specific_content_header}>Products {index + 1}</div>
                    <EditButton
                      width='16px'
                      className={styles.editButton}
                      onClick={() => {
                        setCreateSpecificPics({
                          index: index,
                          data: specificPics[index]
                        })
                        setPopUpSpecificPics(true)
                      }}
                    ></EditButton>
                    <div className={styles.specific_content_values}>
                      {data.map((name, index) => {
                        return <div key={index} className={styles.specific_content_value}>{name}</div>
                      })}
                    </div>
                  </div>
                })}
              </div>
            </div>
          </div>
          <div className={styles.right_content}>
            <div className={styles.img}>
              <div className={styles.img_header}>Main Image</div>
              <div className={styles.img_input}>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    setMainImg({
                      url: URL.createObjectURL(file),
                      file: file
                    });
                    setMainImgFill(false);
                  }}
                  className={`${mainImgFill ? styles.noInput : ''}`}
                  style={mainImg && { display: 'none' }}
                ></input>
                {mainImg && (
                  <BackGroundImg
                    imgURL={mainImg.url}
                    deleteProduct={() => {
                      setMainImg(undefined);
                    }}
                    main={true}
                    className={styles.imgBackGround}
                  ></BackGroundImg>
                )}
              </div>
            </div>
            <div className={styles.listImg}>
              <div className={styles.listImg_header}>Images</div>
              <div className={styles.listImg_input}>
                {listImg &&
                  listImg.map((img, index) => {
                    return (
                      <BackGroundImg
                        key={index}
                        deleteProduct={() => {
                          removeFile(index)
                        }}
                        imgURL={img.url}
                        className={styles.imgBackGround}
                      ></BackGroundImg>
                    );
                  })}
                <input
                  type="file"
                  multiple
                  accept=".jpg, .jpeg, .png"
                  className={`${listImgFill ? styles.noInput : ''}`}
                  onChange={handleImageChange}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          {preview && (
            <Popup
              onClick={() => {
                setPreview(false);
              }}
            >
              <ProductDetails
                data={getReviewData()}
              ></ProductDetails>
            </Popup>
          )}
          <MainButton
            title={'Submit'}
            className={styles.button}
            onClick={handleSubmit}
          ></MainButton>
          <MainButton
            title={'Preview'}
            onClick={() => {
              if (checkinput()) {
                setPreview(true);
              }
            }}
            className={styles.button}
          ></MainButton>
          {(nameFill || priceFill || descriptionFill || quantityFill) && (
            <div className={styles.errorMessage}>Please correct all the input</div>
          )}
        </div>
      </div>
      {
        popUpSpecific
          ?
          <Popup
            width='500px'
            onClick={() => {
              setPopUpSpecific(false)
            }}
            highestZIndex={true}
          >
            <CreateProductSpecific
              onDelete={onDeleteSpecific}
              onSubmit={onSubmitSpecific}
              data={createSpecific}
              setOpenPopup={setPopUpSpecific}
            ></CreateProductSpecific>
          </Popup>
          :
          undefined
      }
      {
        popUpSpecificPics
          ?
          <Popup
            width='500px'
            onClick={() => {
              setPopUpSpecificPics(false)
            }}
            highestZIndex={true}
          >
            <CreateSpecificPics
              onSubmit={onSubmitSpecificPics}
              value={createSpecificPics}
              setOpenPopup={setPopUpSpecificPics}
            ></CreateSpecificPics>
          </Popup>
          :
          undefined
      }
    </div>
  );
}

export default CreateProduct;
