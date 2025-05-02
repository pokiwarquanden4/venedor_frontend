import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import styles from './createProductSpecific.module.scss'
import MainButton from '../../components/MainButton/MainButton';
import { notificationActions } from '../../redux/actions/notification/notificationAction';
import { useDispatch } from 'react-redux';
import BackGroundImg from '../../components/BackGroundImg/BackGroundImg';
import { encodePrice, encodeSaleOff } from '../../config/filterInput';

function CreateSpecificPics({ value, setOpenPopup, onSubmit }) {
    const dispatch = useDispatch()
    const [listImg, setListImg] = useState([]);
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [saleOff, setSaleOff] = useState(0)

    useEffect(() => {
        setListImg(value.data.img)
        setPrice(encodePrice(value.data.price))
        setQuantity(value.data.number)
        setSaleOff(encodeSaleOff(value.data.saleOff))
    }, [value.data.img, value.data.number, value.data.price, value.data.saleOff])

    const removeFile = (index) => {
        setListImg((prevImages) => prevImages.filter((_, idx) => idx !== index));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map((file) => {
            return {
                file: file,
                url: URL.createObjectURL(file)
            }
        });

        setListImg((prevImages) => [...prevImages, ...newImages]);
    };

    const handleSubmit = useCallback(() => {
        if (!quantity || !listImg.length || !price || !saleOff) {
            dispatch(notificationActions.setNotificationContent('Please fill all the field'));
            return
        }
        onSubmit({
            index: value.index,
            img: listImg,
            price: price,
            number: quantity,
            saleOff: saleOff
        })
        setOpenPopup(false)
    }, [dispatch, listImg, onSubmit, price, quantity, saleOff, setOpenPopup, value.index])

    return (
        <div className={styles.container}>
            <div className={styles.price}>
                <div className={styles.price_header}>Price</div>
                <div className={styles.price_wrapper}>
                    <input
                        placeholder="Price"
                        value={price}
                        className={`${styles.price_input}`}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Loại bỏ ký tự không phải số
                            setPrice(encodePrice(value)); // Định dạng giá trị
                        }}
                    />
                    <span className={styles.price_unit}>VND</span>
                </div>
            </div>
            <div className={styles.quantity}>
                <div className={styles.quantity_header}>Quantity</div>
                <input
                    value={quantity}
                    className={`${styles.quantity_input}`}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                            setQuantity("");
                        } else {
                            const parsed = parseInt(value);
                            if (!isNaN(parsed) && parsed >= 0) {
                                setQuantity(parsed);
                            }
                        }
                    }}
                    onKeyDown={(e) => {
                        // Chặn các ký tự không hợp lệ: e, E, +, -, ., v.v.
                        if (
                            ["e", "E", "+", "-", ".", ","].includes(e.key)
                        ) {
                            e.preventDefault();
                        }
                    }}
                />
            </div>
            <div className={styles.saleOff}>
                <div className={styles.saleOff_header}>Sale Off</div>
                <div className={styles.saleOff_wrapper}>
                    <input
                        placeholder="Sale Off"
                        className={`${styles.saleOff_input}`}
                        value={saleOff}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                            if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
                                setSaleOff(value);
                            }
                        }}
                    />
                    <span className={styles.saleOff_unit}>%</span>
                </div>
            </div>
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
                    onChange={handleImageChange}
                ></input>
            </div>

            <div className={styles.submit}>
                <MainButton
                    className={styles.submitButton}
                    title={'Submit'}
                    onClick={() => {
                        handleSubmit()
                    }}
                ></MainButton>
                <MainButton
                    className={styles.submitButton}
                    title={'Cancel'}
                    onClick={() => setOpenPopup(false)}
                ></MainButton>
            </div>
        </div>
    );
}

export default CreateSpecificPics;
