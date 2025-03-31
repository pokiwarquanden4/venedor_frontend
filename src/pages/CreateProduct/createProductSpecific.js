import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './createProductSpecific.module.scss'
import MainButton from '../../components/MainButton/MainButton';

function CreateProductSpecific({ data, onSubmit, setOpenPopup, onDelete }) {
    const [specificHeader, setSpecificHeader] = useState(data.specificName)
    const [specific, setSpecific] = useState(data.specific)

    const submitSpecific = () => {
        if (specificHeader && specific.length) {
            onSubmit({
                id: data.id,
                index: data.index,
                specificName: specificHeader,
                specific: specific
            })
            setOpenPopup(false)
        } else {

        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header_title}>Specific</div>
                <input value={specificHeader} type='text' className={styles.header_input} onChange={(e) => setSpecificHeader(e.target.value)}></input>
            </div>
            <div className={styles.details}>
                <div className={styles.details_title}>Details</div>
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
                Add +
            </button>
            <div className={styles.submit}>
                <MainButton
                    className={styles.submitButton}
                    title={'Submit'}
                    onClick={() => submitSpecific()}
                ></MainButton>
                <MainButton
                    className={styles.submitButton}
                    title={data.index !== undefined ? 'Delete' : 'Cancel'}
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
