import React from 'react';
import styles from './chatbotProductOverview.module.scss'
import { formatVND } from '../../config/utils';
import MainButton from '../MainButton/MainButton';
import { useNavigate } from 'react-router-dom';

const ProductOverView = (props) => {
    const data = props.payload
    const navigate = useNavigate()

    const oldPrice = data.price
    const newPrice = data.price - data.price * (data.saleOff / 100)

    return (
        <div className={styles.container}>
            <div className={styles.data}>
                <div className={styles.picture}>
                    <img alt='' src={data.imgURL}></img>
                </div>
                <div className={styles.details}>
                    <div className={styles.name}>
                        {data.productName}
                        <div className={styles.brandName}>
                            {data.brandName}
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
                        navigate(`/category/${data.categoryId}/${data.id}`);
                    }}
                ></MainButton>
                <MainButton
                    className={styles.buyButton}
                    title={"Buy"}
                ></MainButton>
            </div>
        </div>
    );
};

export default ProductOverView;