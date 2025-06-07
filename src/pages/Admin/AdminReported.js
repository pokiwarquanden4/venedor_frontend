
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import styles from './AdminReported.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { adminActions } from '../../redux/actions/account/AdminActions';
import { adminSelector } from '../../redux/selectors/accountSelector/AdminSelector';
import Popup from '../../components/Popup/Popup';

function AdminReported() {
    const dispatch = useDispatch()
    const adminSelect = useSelector(adminSelector)
    const [detailsPopup, setDetailsPopup] = useState(false)
    const [detailsData, setDetailsData] = useState()

    const [reportedFilter, setReportedFilter] = useState({
        page: 1,
        limit: 20,
    })
    const [reportedData, setReportedData] = useState({
        reports: [],
        totalPages: 0
    });

    useEffect(() => {
        dispatch(adminActions.getReportRequest(reportedFilter))
    }, [dispatch, reportedFilter])

    useEffect(() => {
        if (!adminSelect.reported) return
        setReportedData(adminSelect.reported)
    }, [adminSelect.reported])

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner_wrapper}>
                <div className={styles.header}>
                    <div className={styles.accountInfo_header}>
                        <div className={styles.main_header}>Danh sách tố cáo</div>
                        <div className={styles.sub_header}>Dưới đây là toàn bộ danh sách đơn tố cáo sản phẩm</div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentStyle}>
                        <div className={styles.staffListWrapper}>
                            <div className={styles.table_wrapper}>
                                <table className={styles.staffTable}>
                                    <thead>
                                        <tr>
                                            <th>Người tố cáo</th>
                                            <th>Shop bị tố cáo</th>
                                            <th>Sản phẩm (id)</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(reportedData.reports || []).map((reported) => (
                                            <tr key={reported.id}>
                                                <td>{reported.User.account}</td>
                                                <td>{reported.Storage.User.account}</td>
                                                <td>
                                                    <a
                                                        href={`/category/undefined/${reported.Storage.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ color: '#3498db', textDecoration: 'underline' }}
                                                    >
                                                        {reported.Storage.id}
                                                    </a>
                                                </td>
                                                <td>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ marginRight: 8 }}
                                                        onClick={() => {
                                                            setDetailsData(reported)
                                                            setDetailsPopup(true)
                                                        }}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ color: 'green' }}
                                                        onClick={() => {
                                                            if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')) {
                                                                dispatch(adminActions.handleReportRequest({
                                                                    reportId: reported.id,
                                                                    status: 1
                                                                }))
                                                            }
                                                        }}

                                                    >
                                                        Xoá sản phẩm
                                                    </button>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ color: 'red' }}
                                                        onClick={() => {
                                                            if (window.confirm('Bạn có chắc chắn muốn từ chối đơn khiếu nại này không?')) {
                                                                dispatch(adminActions.handleReportRequest({
                                                                    reportId: reported.id,
                                                                    status: 2
                                                                }))
                                                            }
                                                        }}
                                                    >
                                                        Từ chối
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.pages}>
                                <Pagination pageData={reportedFilter} setPageData={setReportedFilter} totalPages={reportedData.totalPages}></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {detailsPopup ? (
                <Popup
                    onClick={() => {
                        setDetailsPopup(false)
                    }}
                    highestZIndex={true}
                    height='400px'
                >
                    <div style={{ padding: 24, minWidth: 350 }}>
                        <h2 style={{ marginBottom: 16 }}>Chi tiết tố cáo</h2>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Người tố cáo:</strong> {detailsData?.User?.name} ({detailsData?.User?.account})<br />
                            <span style={{ color: '#888', fontSize: 13 }}>{detailsData?.User?.email}</span>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Shop bị tố cáo:</strong> {detailsData?.Storage?.User?.name} ({detailsData?.Storage?.User?.account})<br />
                            <span style={{ color: '#888', fontSize: 13 }}>{detailsData?.Storage?.User?.email}</span>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Sản phẩm:</strong> {detailsData?.Storage?.productName} <br />
                            <strong>ID:</strong>{' '}
                            <a
                                href={`/category/undefined/${detailsData?.Storage?.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#3498db', textDecoration: 'underline' }}
                            >
                                {detailsData?.Storage?.id}
                            </a>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Lý do tố cáo:</strong> {detailsData?.reason}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Trạng thái:</strong>{' '}
                            {detailsData?.status === 0 && <span style={{ color: '#f1c40f' }}>Chờ xử lý</span>}
                            {detailsData?.status === 1 && <span style={{ color: '#2ecc40' }}>Đã duyệt</span>}
                            {detailsData?.status === 2 && <span style={{ color: 'red' }}>Từ chối</span>}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Ngày tạo:</strong> {detailsData?.createdAt ? new Date(detailsData.createdAt).toLocaleString('vi-VN') : '---'}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Ngày cập nhật:</strong> {detailsData?.updatedAt ? new Date(detailsData.updatedAt).toLocaleString('vi-VN') : '---'}
                        </div>
                        <div style={{ marginTop: 24, textAlign: 'right' }}>
                            <button className={styles.staffActionBtn} onClick={() => setDetailsPopup(false)}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </Popup>
            ) : undefined}
        </div>
    );
}

export default AdminReported;
