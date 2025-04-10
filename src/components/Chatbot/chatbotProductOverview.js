import React from 'react';
import styles from './chatbotProductOverview.module.scss'
import { formatVND } from '../../config/utils';
import MainButton from '../MainButton/MainButton';
import { useNavigate } from 'react-router-dom';

const ProductOverView = (props) => {
    const product = props.payload.product
    const onBuy = props.payload.onBuy
    const navigate = useNavigate()

    const oldPrice = product.price
    const newPrice = product.price - product.price * (product.saleOff / 100)

    return (
        <div className={styles.container}>
            <div className={styles.data}>
                <div className={styles.picture}>
                    <img alt='' src={product.imgURL}></img>
                </div>
                <div className={styles.details}>
                    <div className={styles.name}>
                        {product.productName}
                        <div className={styles.brandName}>
                            {product.brandName}
                        </div>
                    </div>
                    <div className={styles.price}>
                        {
                            oldPrice !== newPrice
                                ?
                                <div className={styles.oldPrice}>
                                    {formatVND(oldPrice)}
                                </div>
                                :
                                undefined
                        }
                        <div className={styles.newPrice}>
                            {formatVND(newPrice)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.button}>
                <MainButton
                    className={styles.viewButton}
                    title={"View"}
                    onClick={() => {
                        navigate(`/category/${product.categoryId}/${product.id}`);
                    }}
                ></MainButton>
                <MainButton
                    className={styles.buyButton}
                    title={"Buy"}
                    onClick={() => onBuy(product.StorageSpecifics)}
                ></MainButton>
            </div>
        </div>
    );
};

export default ProductOverView;