import React, { Fragment } from 'react';
import styles from './chatbotSpecific.module.scss'
import MainButton from '../MainButton/MainButton';

const ChatbotSpecific = (props) => {
    const onSelectSpecific = props.payload.onSelectSpecific
    const specificDatas = props.payload.specificDatas
    const specificData = props.payload.specificData

    return (
        <div className={styles.container}>
            <div className={styles.button}>
                {specificData.specific
                    ?
                    specificData.specific.split('___').map(text => {
                        return <MainButton
                            className={styles.specificButton}
                            title={text}
                            onClick={() => onSelectSpecific(specificDatas, {
                                id: specificData.id,
                                specific: text
                            })}
                        ></MainButton>
                    })
                    :
                    <Fragment>
                        <MainButton
                            className={styles.specificButton}
                            title={"Mua"}
                            onClick={() => onSelectSpecific('buy')}
                        ></MainButton>
                        <MainButton
                            className={styles.specificButton}
                            title={"Hủy"}
                            onClick={() => onSelectSpecific('cancel')}
                        ></MainButton>
                    </Fragment>
                }

            </div>
        </div>
    );
};

export default ChatbotSpecific;