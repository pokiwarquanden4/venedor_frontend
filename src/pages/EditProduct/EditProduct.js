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
  priceFilter,
  quantityFilter,
  saleOffFilter,
} from '../../config/filterInput';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';
import routes from '../../config/routes';

function EditProduct() {
  const params = useParams();
  const productSelect = useSelector(productSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [name, setName] = useState('');
  const [nameFill, setNameFill] = useState();
  const [price, setPrice] = useState('');
  const [priceFill, setPriceFill] = useState();
  const [quantity, setQuantity] = useState('');
  const [quantityFill, setQuantityFill] = useState();
  const [description, setDescription] = useState('');
  const [descriptionFill, setDescriptionFill] = useState();
  const [detailsDescription, setDetailsDescription] = useState('');
  const [saleOff, setSaleOff] = useState('');
  const [saleOffFill, setSaleOffFill] = useState();
  const [category, setCategory] = useState();

  const mainImgRef = useRef();
  const [mainImg, setMainImg] = useState();
  const [mainImgFill, setMainImgFill] = useState();

  const listImgRef = useRef();
  const [listImg, setListImg] = useState([]);
  const [listImgFile, setListImgFile] = useState(new DataTransfer().files);
  const [listImgFill, setListImgFill] = useState();

  const [currentImg, setCurrentImg] = useState();
  const [currentListImg, setCurrentListImg] = useState([]);
  const [currentListImgRemove, setCurrentListImgRemove] = useState('');

  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (productSelect.getAllProduct) {
      setData(productSelect.getAllProduct.find((obj) => obj.id == params.id));
    }
  }, [productSelect.getAllProduct]);

  useEffect(() => {
    if (data) {
      setName(data.productName);
      setPrice(encodePrice(data.price));
      setQuantity(data.number);
      setDescription(data.description);
      setSaleOff(encodeSaleOff(data.saleOff));
      setCategory(data.category);
      setCurrentImg([data.imgURL]);
      setCurrentListImg(data.listImgURL.split('_').slice(1));
      setMainImg(1);
    }
  }, [data]);

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

  const checkInput = useCallback(() => {
    !name && setNameFill(true);
    (!price || !priceFilter(price)) && setPriceFill(true);
    (!quantity || !quantityFilter(quantity)) && setQuantityFill(true);
    saleOff && !saleOffFilter(saleOff) && setSaleOffFill(true);
    !description && setDescriptionFill(true);
    !mainImgRef.current.files[0] && !currentImg && setMainImgFill(true);
    listImgRef.current.files.length === 0 && currentListImg.length === 0 && setListImgFill(true);

    if (
      !nameFill &&
      !priceFill &&
      !descriptionFill &&
      !quantityFill &&
      !saleOffFill &&
      !(!mainImgRef.current.files[0] && !currentImg) &&
      !(listImgRef.current.files.length === 0 && currentListImg.length === 0)
    ) {
      return true;
    } else {
      return false;
    }
  });

  const handleSubmit = useCallback(() => {
    if (checkInput()) {
      const submition = () => {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('productName', name);
        formData.append('price', decodePrice(price));
        formData.append('description', description);
        formData.append('number', quantity);
        formData.append('saleOff', decodeSaleOff(saleOff));
        formData.append('category', category);
        formData.append('main', mainImgRef.current.files[0] ? true : false);
        formData.append('remove', currentListImgRemove);
        mainImgRef.current.files[0] && formData.append('img', mainImgRef.current.files[0]);
        if (listImgFile && listImgFile.length > 0) {
          for (let i = 0; i < listImgFile.length; i++) {
            formData.append('img', listImgFile[i]);
          }
        }
        dispatch(productActions.editProductRequest(formData));
      };
      submition();
    }
  });

  useEffect(() => {
    if (productSelect.success) {
      const handleNavigate = async () => {
        await dispatch(productActions.setProductSuccess(false));
        navigate(routes.accountSeller);
      };
      handleNavigate();
    }
  }, [productSelect.success]);

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
          <div className={styles.main_header}>Edit Product</div>
          <div className={styles.sub_header}>Edit your store</div>
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
            </div>
            <div className={styles.price}>
              <div className={styles.price_header}>Price</div>
              <input
                placeholder="Price"
                value={price}
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
            </div>
            <div className={styles.quantity}>
              <div className={styles.quantity_header}>Quantity</div>
              <input
                value={quantity}
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
            </div>
            <div className={styles.description}>
              <div className={styles.description_header}>Description</div>
              <textarea
                type="text"
                placeholder="Description"
                value={description}
                className={`${styles.description_input} ${descriptionFill ? styles.noInput : ''}`}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                onFocus={(e) => {
                  setDescriptionFill(false);
                }}
              ></textarea>
            </div>
            <div className={styles.description}>
              <div className={styles.description_header}>Details Description</div>
              <textarea
                value={detailsDescription}
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
                value={saleOff}
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
            </div>
            <div className={styles.category}>
              <div className={styles.category_header}>Category</div>
              <select
                className={styles.category_input}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="None">None</option>
                <option value="Hiking">Hiking</option>
                <option value="Biking">Biking</option>
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
                {currentImg && (
                  <BackGroundImg
                    main={true}
                    imgURL={currentImg}
                    deleteProduct={() => {
                      setCurrentImg(undefined);
                      setMainImg(undefined);
                      setCurrentListImgRemove(`___${currentImg}` + currentListImgRemove);
                    }}
                    className={styles.imgBackGround}
                  ></BackGroundImg>
                )}
                {mainImg && mainImg !== 1 && (
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
                {currentListImg &&
                  currentListImg.map((img, index) => {
                    return (
                      <BackGroundImg
                        key={index}
                        deleteProduct={() => {
                          let arr = currentListImgRemove;
                          setCurrentListImg(
                            currentListImg.filter(function (url, innerIndex) {
                              if (innerIndex === index) {
                                arr += `___${url}`;
                              }
                              return innerIndex !== index;
                            })
                          );
                          setCurrentListImgRemove(arr);
                        }}
                        imgURL={img}
                        className={styles.imgBackGround}
                      ></BackGroundImg>
                    );
                  })}
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
          <MainButton title={'Save'} className={styles.button} onClick={handleSubmit}></MainButton>

          {(nameFill || priceFill || descriptionFill || quantityFill) && (
            <div className={styles.errorMessage}>Please correct all the input</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
