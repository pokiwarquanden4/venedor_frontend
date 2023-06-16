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
  priceFilter,
  quantityFilter,
  saleOffFilter,
} from '../../config/filterInput';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';
import routes from '../../config/routes';
import categoryList from '../../config/category';

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
  const [detailsDescription, setDetailsDescription] = useState();
  const [saleOff, setSaleOff] = useState();
  const [saleOffFill, setSaleOffFill] = useState();
  const [category, setCategory] = useState();

  const mainImgRef = useRef();
  const [mainImg, setMainImg] = useState();
  const [mainImgFill, setMainImgFill] = useState();

  const listImgRef = useRef();
  const [listImg, setListImg] = useState([]);
  const [listImgFile, setListImgFile] = useState(new DataTransfer().files);
  const [listImgFill, setListImgFill] = useState();

  const [preview, setPreview] = useState(false);

  const convertBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  });

  const removeFile = useCallback((e, index) => {
    const files = e.files;

    // Convert the FileList to an array
    const filesArray = Array.from(files);

    // Remove the file at the specified index
    filesArray.splice(index, 1);

    // Convert the updated array back to a FileList
    const updatedFiles = new DataTransfer();
    filesArray.forEach((file) => updatedFiles.items.add(file));

    setListImgFile(updatedFiles.files);
  });

  const addFile = useCallback((e) => {
    const files = e.files;
    const addFiles = listImgFile;

    // Convert the FileList to an array
    const filesArray = Array.from(files);
    const addFilesArray = Array.from(addFiles);

    // Convert the updated array back to a FileList
    const updatedFiles = new DataTransfer();
    filesArray.concat(addFilesArray).forEach((file) => updatedFiles.items.add(file));

    setListImgFile(updatedFiles.files);
  });

  const checkinput = useCallback(() => {
    !name && setNameFill(true);
    (!price || !priceFilter(price)) && setPriceFill(true);
    (!quantity || !quantityFilter(quantity)) && setQuantityFill(true);
    saleOff && !saleOffFilter(saleOff) && setSaleOffFill(true);
    !description && setDescriptionFill(true);
    !mainImgRef.current.files[0] && setMainImgFill(true);
    listImgRef.current.files.length === 0 && setListImgFill(true);

    if (
      !nameFill &&
      !priceFill &&
      !descriptionFill &&
      !quantityFill &&
      !saleOffFill &&
      mainImgRef.current.files[0] &&
      listImgRef.current.files !== 0
    ) {
      return true;
    } else {
      return false;
    }
  });

  const handleSubmit = useCallback(() => {
    if (checkinput()) {
      const formData = new FormData();
      formData.append('productName', name);
      formData.append('price', decodePrice(price));
      formData.append('description', description);
      formData.append('detailDescription', detailsDescription);
      formData.append('number', quantity);
      formData.append('saleOff', decodeSaleOff(saleOff));
      formData.append('category', category);
      formData.append('img', mainImgRef.current.files[0]);
      for (let i = 0; i < listImgFile.length; i++) {
        formData.append('img', listImgFile[i]);
      }
      dispatch(productActions.createProductRequest(formData));
    }
  });

  const getReviewData = useCallback(() => {
    return {
      description: description,
      number: quantity,
      price: decodePrice(price),
      detailDescription: detailsDescription,
      saleOff: decodeSaleOff(saleOff),
    };
  });

  useEffect(() => {
    if (listImgRef.current) {
      listImgRef.current.files = listImgFile;
      const handle = async () => {
        const files = listImgFile;
        if (listImgFile) {
          const values = [];
          for (let i = 0; i < files.length; i++) {
            const base64 = await convertBase64(files[i]);
            values.push(base64);
          }
          setListImg(values);
        } else {
          setListImg([]);
        }
      };

      //Run
      handle();
    }
  }, [listImgFile]);

  useEffect(() => {
    if (productSelect.success) {
      const handleNavigate = async () => {
        await dispatch(productActions.setProductSuccess(false));
        navigate(routes.accountSeller);
      };

      handleNavigate();
    }
  }, [productSelect.success]);

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
                placeholder="Price"
                className={`${styles.price_input} ${priceFill ? styles.noInput : ''}`}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                onFocus={(e) => {
                  setPriceFill(false);
                }}
                onBlur={() => {
                  if (price) {
                    !priceFilter(price) && setPriceFill(true);
                  }
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
                placeholder="Quantity"
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
              <textarea
                type="text"
                placeholder="Description"
                className={`${styles.description_input} ${descriptionFill ? styles.noInput : ''}`}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                onFocus={(e) => {
                  setDescriptionFill(false);
                }}
              ></textarea>
              {descriptionFill ? (
                <div className={styles.notification}>You need to fill in this blank</div>
              ) : undefined}
            </div>
            <div className={styles.description}>
              <div className={styles.description_header}>Details Description</div>
              <textarea
                type="text"
                placeholder="Details Description"
                className={styles.description_input}
                onChange={(e) => {
                  setDetailsDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className={styles.saleOff}>
              <div className={styles.saleOff_header}>Sale Off</div>
              <input
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
                  setCategory(e.target.value);
                }}
              >
                <option value="None">None</option>
                {categoryList.map((item, index) => {
                  return (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
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
                    const base64 = await convertBase64(file);
                    setMainImg(base64);
                    setMainImgFill(false);
                  }}
                  className={`${mainImgFill ? styles.noInput : ''}`}
                  ref={mainImgRef}
                  style={mainImg && { display: 'none' }}
                ></input>
                {mainImg && (
                  <BackGroundImg
                    imgURL={mainImg}
                    deleteProduct={() => {
                      setMainImg(undefined);
                      mainImgRef.current.value = '';
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
                          removeFile(listImgRef.current, index);
                        }}
                        imgURL={img}
                        className={styles.imgBackGround}
                      ></BackGroundImg>
                    );
                  })}
                <input
                  type="file"
                  multiple
                  ref={listImgRef}
                  accept=".jpg, .jpeg, .png"
                  className={`${listImgFill ? styles.noInput : ''}`}
                  onChange={() => {
                    setListImgFill(false);
                    addFile(listImgRef.current);
                  }}
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
                listImg={listImg}
                mainImg={mainImg}
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
    </div>
  );
}

export default CreateProduct;
