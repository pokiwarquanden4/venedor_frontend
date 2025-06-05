import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './createProductSpecific.module.scss'
import MainButton from '../../components/MainButton/MainButton';
import { notificationActions } from '../../redux/actions/notification/notificationAction';
import { useDispatch } from 'react-redux';

function CreateProductSpecific({ data, onSubmit, setOpenPopup, onDelete }) {
    const dispatch = useDispatch()
    const [specificHeader, setSpecificHeader] = useState(data.specificName)
    const [specific, setSpecific] = useState(data.specific)

    const submitSpecific = () => {
        // Kiểm tra nếu specificHeader tồn tại và specific không chứa chuỗi rỗng
        if (specificHeader && specific.length && specific.every(value => value.trim() !== '')) {
            onSubmit({
                id: data.id,
                index: data.index,
                specificName: specificHeader,
                specific: specific
            });
            setOpenPopup(false);
        } else {
            dispatch(notificationActions.setNotificationContent('Vui lòng điền đầy đủ và không để trống thông tin chi tiết.'));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header_title}>Thuộc tính</div>
                <input value={specificHeader} type='text' className={styles.header_input} onChange={(e) => setSpecificHeader(e.target.value)}></input>
            </div>
            <div className={styles.details}>
                <div className={styles.details_title}>Chi tiết</div>
                {specific.map((value, i) => {
                    return <div key={i} className={styles.inputWrapper}>
                        <input
                            value={value}
                            type='text'
                            className={styles.details_input}
                            onChange={(e) => {
                                setSpecific((pre) => {
                                    const newSpecific = [...pre]
                                    newSpecific[i] = e.target.value

                                    return newSpecific
                                })
                            }}
                        ></input>
                        <button
                            className={styles.deleteButton}
                            onClick={() => {
                                setSpecific((pre) => {
                                    const newSpecific = [...pre]
                                    newSpecific.splice(i, 1)
                                    return newSpecific
                                })
                            }}
                        >-</button>
                    </div>
                })}
            </div>
            <button
                className={styles.addButton}
                onClick={() => {
                    setSpecific((pre) => {
                        const newSpecific = [...pre, '']
                        return newSpecific
                    })
                }}>
                Thêm +
            </button>
            <div className={styles.submit}>
                <MainButton
                    className={styles.submitButton}
                    title={'Xác nhận'}
                    onClick={submitSpecific}
                ></MainButton>
                <MainButton
                    className={styles.submitButton}
                    title={data.index !== undefined ? 'Xóa' : 'Hủy'}
                    onClick={() => {
                        if (data.index !== undefined) {
                            onDelete(data.index)
                        }
                        setOpenPopup(false)
                    }}
                ></MainButton>
            </div>
        </div>
    );
}

export default CreateProductSpecific;
