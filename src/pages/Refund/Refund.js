import { useEffect, useState } from 'react';
import styles from './Refund.module.scss'
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { adminSelector } from '../../redux/selectors/accountSelector/AdminSelector';
import { adminActions } from '../../redux/actions/account/AdminActions';

const Refund = () => {
    const dispatch = useDispatch()
    const adminSelect = useSelector(adminSelector)
    const [refundPopup, setRefundPopup] = useState(false)
    const [refund, setRefund] = useState()
    const [refundFilter, setRefundFilter] = useState({
        page: 1,
        limit: 20,
    })
    const [refundData, setRefundData] = useState({
        refunds: [],
        totalPages: 0
    });

    useEffect(() => {
        dispatch(adminActions.getRefundRequest(refundFilter))
    }, [dispatch, refundFilter])

    useEffect(() => {
        if (!adminSelect.refund) return
        setRefundData(adminSelect.refund)
    }, [adminSelect.refund])

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner_wrapper}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.accountInfo_header}>
                            <div className={styles.main_header}>Danh sách yêu cầu hoàn trả hàng</div>
                            <div className={styles.sub_header}>Dưới đây là toàn bộ danh sách yêu cầu shop hoàn trả sản phẩm </div>
                        </div>
                    </div>
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
                                    {(refundData.refunds || []).map((refund) => (
                                        <tr key={refund.id}>
                                            <td>{refund.User.account}</td>
                                            <td>{refund.Storage.User.account}</td>
                                            <td>
                                                <a
                                                    href={`/category/undefined/${refund.Storage.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: '#3498db', textDecoration: 'underline' }}
                                                >
                                                    {refund.Storage.id}
                                                </a>
                                            </td>
                                            <td>
                                                <button
                                                    className={styles.staffActionBtn}
                                                    style={{ marginRight: 8 }}
                                                    onClick={() => {
                                                        setRefund(refund)
                                                        setRefundPopup(true)
                                                    }}
                                                >
                                                    Chi tiết
                                                </button>
                                                {
                                                    refund.status === 0
                                                        ?
                                                        <button
                                                            className={styles.staffActionBtn}
                                                            style={{ color: 'green' }}
                                                            onClick={() => {
                                                                if (window.confirm('Bạn có chắc chắn muốn đồng ý hoàn tiền không?')) {
                                                                    dispatch(adminActions.handleRefundRequest({
                                                                        refundId: refund.id,
                                                                        status: 1
                                                                    }))
                                                                }
                                                            }}
                                                        >
                                                            Đồng ý
                                                        </button>
                                                        :
                                                        <button
                                                            className={styles.staffActionBtn}
                                                            style={{ color: 'green' }}
                                                            onClick={() => {
                                                                if (window.confirm('Hãy đảm bảo rằng bạn đã thực hiện chuyển khoản lại cho khách')) {
                                                                    dispatch(adminActions.handleRefundRequest({
                                                                        refundId: refund.id,
                                                                        status: 4
                                                                    }))
                                                                }
                                                            }}

                                                        >
                                                            Xác nhận hoàn tiền
                                                        </button>
                                                }
                                                <button
                                                    className={styles.staffActionBtn}
                                                    style={{ color: 'red' }}
                                                    onClick={() => {
                                                        if (window.confirm('Bạn có chắc chắn muốn từ chối đơn hoàn tiền này không?')) {
                                                            dispatch(adminActions.handleRefundRequest({
                                                                refundId: refund.id,
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
                            <Pagination pageData={refundFilter} setPageData={setRefundFilter} totalPages={refundData.totalPages}></Pagination>
                        </div>
                    </div>
                </div>
            </div>

            {refundPopup ? (
                <Popup
                    onClick={() => {
                        setRefundPopup(false)
                    }}
                    highestZIndex={true}
                    height='80%'
                >
                    <div style={{ padding: 24, minWidth: 350 }}>
                        <h2 style={{ marginBottom: 16 }}>Chi tiết hoàn trả</h2>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Người yêu cầu:</strong> {refund?.User?.name} ({refund?.User?.account})<br />
                            <span style={{ color: '#888', fontSize: 13 }}>{refund?.User?.email}</span>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Shop:</strong> {refund?.Storage?.User?.name} ({refund?.Storage?.User?.account})<br />
                            <span style={{ color: '#888', fontSize: 13 }}>{refund?.Storage?.User?.email}</span>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Sản phẩm:</strong> {refund?.Storage?.productName} <br />
                            <strong>ID:</strong>{' '}
                            <a
                                href={`/category/undefined/${refund?.Storage?.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#3498db', textDecoration: 'underline' }}
                            >
                                {refund?.Storage?.id}
                            </a>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Lý do hoàn trả:</strong> {refund?.reason}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Trạng thái:</strong>{' '}
                            {refund?.status === 0 && <span style={{ color: '#f1c40f' }}>Chờ xử lý</span>}
                            {refund?.status === 1 && <span style={{ color: '#2ecc40' }}>Đã duyệt</span>}
                            {refund?.status === 2 && <span style={{ color: 'red' }}>Từ chối</span>}
                            {refund?.status === 3 && <span style={{ color: '#3498db' }}>Khách đã trả hàng</span>}
                            {refund?.status === 4 && <span style={{ color: '#16a085' }}>Hoàn thành</span>}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Ngày tạo:</strong> {refund?.createdAt ? new Date(refund.createdAt).toLocaleString('vi-VN') : '---'}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <strong>Ngày cập nhật:</strong> {refund?.updatedAt ? new Date(refund.updatedAt).toLocaleString('vi-VN') : '---'}
                        </div>
                        {refund?.evidenceURL && (
                            <div style={{ marginBottom: 8 }}>
                                <strong>Bằng chứng video:</strong><br />
                                <video src={refund.evidenceURL} controls style={{ width: '100%', maxHeight: 200, marginTop: 4 }} />
                            </div>
                        )}
                        {refund?.refundBankURL && (
                            <div style={{ marginBottom: 8 }}>
                                <strong>Mã QR hoàn tiền:</strong><br />
                                <img src={refund.refundBankURL} alt="QR hoàn tiền" style={{ width: 120, marginTop: 4 }} />
                            </div>
                        )}
                        <div style={{ marginTop: 24, textAlign: 'right' }}>
                            <button className={styles.staffActionBtn} onClick={() => setRefundPopup(false)}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </Popup>
            ) : undefined}
        </div>
    );
}

export default Refund