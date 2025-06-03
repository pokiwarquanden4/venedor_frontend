import { useCallback, useEffect, useRef, useState } from 'react';
import BackGroundImg from '../../components/BackGroundImg/BackGroundImg';
import styles from './EditProduct.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../redux/actions/product/ProductActions';
import Popup from '../../components/Popup/Popup';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import { useNavigate, useParams } from 'react-router-dom';
import {
  decodePrice,
  decodeSaleOff,
  encodePrice,
  encodeSaleOff,
  quantityFilter,
  saleOffFilter,
} from '../../config/filterInput';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';
import routes from '../../config/routes';
import Select from "react-select";
import { EditButton } from '../../asset/img/HeaderIcon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFirebaseImage } from '../../fireBase/imageUpload';
import { notificationActions } from '../../redux/actions/notification/notificationAction';
import { loadingActions } from '../../redux/actions/loading/LoadingActions';
import CreateProductSpecific from '../CreateProduct/createProductSpecific';
import CreateSpecificPics from '../CreateProduct/CreateSpecificPics';
import { productSearchActions } from '../../redux/actions/product/ProductSearchAction';
import { productSearchSelector } from '../../redux/selectors/productSelector/productSearchSelector';

function EditProduct() {
  const params = useParams();
  const productSelect = useSelector(productSelector);
  const productSearchSelect = useSelector(productSearchSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState()
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

  useEffect(() => {
    dispatch(productSearchActions.searchProductByIdRequest({ id: params.id }));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (productSearchSelect.searchProductById) {
      const convertData = {
        ...productSearchSelect.searchProductById,
        listImgURL: productSearchSelect.searchProductById.listImgURL.split('___'),
      };
      setData(convertData);
    }
  }, [productSearchSelect.searchProductById]);

  const addDefaultData = useCallback(() => {
    if (!data) return
    setName(data.productName)
    setPrice(encodePrice(data.price))
    setQuantity(data.number)
    setDescription(data.description)
    setSaleOff(encodeSaleOff(data.saleOff))
    setCategoryId(data.categoryId)
    setCategoryDetailId(data.categoryDetailId)
    setBrand(data.brandName)
    const specific = data.StorageSpecifics.map((item) => {
      return {
        specificName: item.specificName,
        specific: item.specific.split('___')
      }
    })
    setSpecific(specific)

    setCombination(generateCombinations(specific))
    setSpecificPics(data.StorageSpecificPics.map(item => {
      return {
        combination: [item.option1, item.option2],
        img: item.listImgURL.split('___').map(item => {
          return {
            file: undefined,
            url: item
          }
        }),
        price: item.price,
        number: item.number,
        saleOff: item.saleOff,
        valid: true
      }
    }))
    setMainImg({
      url: data.imgURL,
      file: undefined
    })
    setListImg(data.listImgURL.map(url => {
      return {
        file: undefined,
        url: url
      }
    }))
  }, [data])

  useEffect(() => {
    addDefaultData()
  }, [addDefaultData])

  const checkinput = useCallback(() => {
    // Validate each field and set corresponding error states
    const isNameValid = !!name || setNameFill(true);
    const isPriceValid = (!!decodePrice(price) || combination.length > 0) || setPriceFill(true);
    const isQuantityValid = ((!!(quantity >= 0) && quantityFilter(quantity)) || combination.length > 0) || setQuantityFill(true);
    const isSaleOffValid = (!!(decodeSaleOff(price) >= 0) || combination.length > 0) || setSaleOffFill(true);
    const isCategoryIdValid = !!categoryId || setCategoryIdFill(true);
    const isCategoryDetailIdValid = !!categoryDetailId || setCategoryDetailIdFill(true);
    const isDescriptionValid = !!description || setDescriptionFill(true);
    const isMainImgValid = !!mainImg || setMainImgFill(true);
    const isListImgValid = listImg.length > 0 || setListImgFill(true);

    // Check if specific combinations are valid
    const isSpecificValid = combination.length === specificPics.filter(data => data.valid).length;
    if (!isSpecificValid) {
      dispatch(notificationActions.setNotificationContent('Please check specific'));
      return false;
    }

    // Return true if all fields are valid
    return (
      isNameValid &&
      isPriceValid &&
      isQuantityValid &&
      isSaleOffValid &&
      isCategoryIdValid &&
      isCategoryDetailIdValid &&
      isDescriptionValid &&
      isMainImgValid &&
      isListImgValid
    );
  }, [name, price, quantity, categoryId, categoryDetailId, description, mainImg, listImg, combination.length, specificPics, dispatch]);


  const handleSubmit = useCallback(async () => {
    if (checkinput()) {
      //upload img
      dispatch(loadingActions.setLoadingLoading(true))
      const mainImgUrl = mainImg.file ? await uploadFirebaseImage({
        location: 'mainImg'
      }, mainImg.file) : mainImg.url;

      const listImgUrl = []
      for (let i = 0; i < listImg.length; i++) {
        const url = listImg[i].file ? await uploadFirebaseImage({
          location: 'listImg'
        }, listImg[i].file) : listImg[i].url;

        listImgUrl.push(url)
      }

      const specificPicsData = await Promise.all(
        specificPics.map(async (item) => {
          const imgURL = []

          for (let i = 0; i < item.img.length; i++) {
            const data = item.img[i]
            const url = data.file ? await uploadFirebaseImage({ location: 'listImg' }, data.file) : data.url
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
        id: data.id,
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

      await dispatch(productActions.editProductRequest(productData));

      navigate(routes.accountSeller);
    }
  }, [brand, categoryDetailId, categoryId, checkinput, data, description, dispatch, listImg, mainImg, name, navigate, price, quantity, saleOff, specific, specificPics]);

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
      const [option1, option2] = Object.values(result)
      return [option1, option2];
    });
  };

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
    setSpecific((prev) => {
      let updatedSpecific;
      if (data.index !== undefined) {
        // Update an existing specific
        updatedSpecific = [...prev];
        updatedSpecific[data.index] = {
          specificName: data.specificName,
          specific: data.specific,
        };
      } else {
        // Add a new specific
        updatedSpecific = [
          ...prev,
          {
            specificName: data.specificName,
            specific: data.specific,
          },
        ];
      }

      // Generate combinations based on the updated specific
      const combinations = generateCombinations(updatedSpecific);
      setCombination(combinations);
      setSpecificPics(
        combinations.map((item) => ({
          combination: item,
          img: [],
          price: 0,
          number: 0,
          saleOff: 0,
          valid: false,
        }))
      );

      return updatedSpecific;
    });
  };

  const onSubmitSpecificPics = (data) => {
    setSpecificPics((pre) => {
      const newSpe = [...pre]
      newSpe[data.index].img = data.img
      newSpe[data.index].price = decodePrice(data.price)
      newSpe[data.index].number = data.number
      newSpe[data.index].saleOff = decodeSaleOff(data.saleOff)
      newSpe[data.index].valid = true

      return newSpe
    })
  }

  useEffect(() => {
    if (specificPics.length) {
      let number = 0
      let price = 0
      let saleOff = 0

      specificPics.forEach(data => {
        number += data.number

        //get the lowest acutal price
        const actualPrice = data.price - (data.price * data.saleOff) / 100
        if (price === 0 || actualPrice < price) {
          price = data.price
          saleOff = data.saleOff
        }
      })

      setPrice(encodePrice(price))
      setPriceFill(false)
      setSaleOff(encodeSaleOff(saleOff))
      setSaleOffFill(false)
      setQuantity(number)
      setQuantityFill(false)
    }
  }, [specificPics])

  const onDeleteSpecific = (index) => {
    setSpecific((prev) => {
      const updatedSpecific = prev.filter((_, i) => i !== index);

      // Generate combinations based on the updated specific
      const combinations = generateCombinations(updatedSpecific);
      setCombination(combinations);
      setSpecificPics(
        combinations.map((item) => ({
          combination: item,
          img: [],
          price: 0,
          number: 0,
          saleOff: 0,
          valid: false,
        }))
      );

      return updatedSpecific;
    });
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

  const handleDelete = async () => {
    await dispatch(productActions.deleteProductRequest({
      id: data.id
    }))
    navigate(routes.accountSeller);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <div className={styles.main_header}>Update Product</div>
          <div className={styles.sub_header}>Make your product more recognizable</div>
        </div>
        <div className={styles.content}>
          <div className={styles.left_content}>
            <div className={styles.name}>
              <div className={styles.name_header}>Name</div>
              <input
                placeholder="Product Name"
                value={name}
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
              <div className={styles.price_wrapper}>
                <input
                  disabled={specificPics.length ? true : false}
                  placeholder="Price"
                  value={price}
                  className={`${styles.price_input} ${priceFill ? styles.noInput : ''}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Loại bỏ ký tự không phải số
                    setPrice(encodePrice(value)); // Định dạng giá trị
                  }}
                  onFocus={(e) => {
                    setPriceFill(false);
                  }}
                />
                <span className={styles.price_unit}>VND</span>
              </div>
              {priceFill ? (
                <div className={styles.notification}>
                  You need to fill in this blank (Ex: 1.000 VND, 10.000.000 VND)
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
              <div className={styles.saleOff_wrapper}>
                <input
                  disabled={specificPics.length ? true : false}
                  placeholder="Sale Off"
                  value={saleOff}
                  className={`${styles.saleOff_input} ${saleOffFill ? styles.noInput : ''}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
                      setSaleOff(value);
                    }
                  }}
                  onFocus={(e) => {
                    setSaleOffFill(false);
                  }}
                />
              </div>
              {saleOffFill ? (
                <div className={styles.notification}>
                  You need to fill in this blank (0% to 100%)
                </div>
              ) : undefined}
            </div>
            <div className={styles.category}>
              <div className={styles.category_header}>Category</div>
              <select
                className={styles.category_input}
                value={categoryId}
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
                value={categoryDetailId}
                className={styles.category_input}
                onChange={(e) => {
                  setCategoryDetailIdFill(false)
                  setCategoryDetailId(e.target.value);
                }}
              >
                <option value={undefined}>None</option>
                {(productSelect.category.categoryDetails[categoryId] || []).map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.categoryName}
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
                value={brand}
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
                  return <div key={index} className={styles.specific_values}>
                    <div className={styles.specific_content_header}>Details {index + 1}</div>
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
                      {item.map((name, index) => {
                        if (!name) return undefined
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
            title={'Delete'}
            onClick={handleDelete}
            className={styles.button}
          ></MainButton>
          <MainButton
            title={'Reset'}
            onClick={addDefaultData}
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

export default EditProduct;
