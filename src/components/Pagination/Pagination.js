import { Fragment, useEffect, useState } from 'react';
import { FilterIcon, LeftArrowIcon, RightArrowIcon } from '../../asset/img/ItemsIcon';
import styles from './Pagination.module.scss';

function Pagination({ pageData, setPageData, totalPages }) {
    return (
        <div>
            {totalPages && totalPages > 1 ? (
                <div className={styles.pages}>
                    {pageData.page > 1 ? (
                        <div
                            className={styles.leftArrow}
                            onClick={() => {
                                setPageData((preData) => {
                                    return {
                                        ...preData,
                                        page: preData.page - 1
                                    }
                                })
                            }}
                        >
                            <LeftArrowIcon className={styles.rightArrow_icon}></LeftArrowIcon>
                        </div>
                    ) : undefined}
                    {Array.from({ length: totalPages }, (_, index) => {
                        const tpage = index + 1
                        if (Math.abs(pageData.page - tpage) === 3 && tpage !== 1 && tpage !== totalPages) return <div className={styles.pageDots}>...</div>
                        if (tpage !== 1 && tpage !== totalPages && Math.abs(pageData.page - tpage) > 2) return undefined
                        return <div
                            className={`${styles.paging} ${pageData.page === tpage ? styles.paging_active : ''}`}
                            key={index}
                            onClick={() => {
                                setPageData((preData) => ({
                                    ...preData,
                                    page: tpage
                                }));
                            }}
                        >
                            {tpage}
                        </div>
                    }
                    )}

                    {pageData.page < totalPages ? (
                        <div
                            className={styles.rightArrow}
                            onClick={() => {
                                setPageData((preData) => {
                                    return {
                                        ...preData,
                                        page: preData.page + 1
                                    }
                                })
                            }}
                        >
                            <RightArrowIcon className={styles.leftArrow_icon}></RightArrowIcon>
                        </div>
                    ) : undefined}
                </div>
            ) : undefined}
        </div>
    );
}

export default Pagination;
