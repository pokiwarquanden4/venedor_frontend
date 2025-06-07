import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../../components/MainButton/MainButton';
import styles from './AdminHome.module.scss'
import { useEffect, useState } from 'react';
import { adminActions } from '../../redux/actions/account/AdminActions';
import { adminSelector } from '../../redux/selectors/accountSelector/AdminSelector';
import Pagination from '../../components/Pagination/Pagination';
import Popup from '../../components/Popup/Popup';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import routes from '../../config/routes';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
    const navigate = useNavigate()
    const adminSelect = useSelector(adminSelector)
    const dispatch = useDispatch()
    const [userPopup, setUserPopup] = useState(false)
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        account: "",
        gender: "",
        roleName: "",
        disable: false,
        reportedCount: 0,
        Reporteds: [],
        createdAt: "",
        updatedAt: ""
    })
    const [userListFilter, setUserListFiler] = useState({
        page: 1,
        limit: 20,
        text: ''
    })
    const [userListData, setUserListData] = useState({
        users: [],
        totalPages: 0
    })
    const [searchVal, setSearchVal] = useState({
        seller: '',
        user: ''
    })

    const [sellerListFilter, setSellerListFilter] = useState({
        page: 1,
        limit: 20,
        text: ''
    })
    const [sellerListData, setSellerListData] = useState({
        sellers: [],
        totalPages: 0,
    })
    const [graphDataPopup, setGraphDataPopup] = useState(false)
    const [graphData, setGraphData] = useState()

    useEffect(() => {
        dispatch(adminActions.getUserListRequest(userListFilter))
    }, [dispatch, userListFilter])

    useEffect(() => {
        if (!adminSelect.userList) return
        setUserListData(adminSelect.userList)
    }, [adminSelect.userList])

    useEffect(() => {
        if (!adminSelect.graph) return
        setGraphData(adminSelect.graph)
    }, [adminSelect.graph])

    useEffect(() => {
        dispatch(adminActions.getSellerListRequest(sellerListFilter))
    }, [dispatch, sellerListFilter])

    useEffect(() => {
        if (!adminSelect.sellerList) return
        setSellerListData(adminSelect.sellerList)
    }, [adminSelect.sellerList])

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner_wrapper}>
                <div className={styles.header}>
                    <div className={styles.content}>
                        <div className={styles.staff_header}>
                            <div className={styles.accountInfo_header}>
                                <div className={styles.main_header}>Danh sách người dùng</div>
                                <div className={styles.sub_header}>Dưới đây là toàn bộ danh sách người dùng web</div>
                            </div>
                            <div style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tài khoản người bán..."
                                    style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', flex: 1 }}
                                    onChange={e => {
                                        setSearchVal(prev => ({
                                            ...prev,
                                            user: e.target.value,
                                        }));
                                    }}
                                    value={searchVal.user || ''}
                                />
                                <MainButton
                                    title="Tìm kiếm"
                                    onClick={() => {
                                        setUserListFiler(pre => ({
                                            ...pre,
                                            text: searchVal.user
                                        }))
                                    }}
                                />
                            </div>
                        </div>

                        <div className={styles.staffListWrapper}>
                            <div className={styles.table_wrapper}>
                                <table className={styles.staffTable}>
                                    <thead>
                                        <tr>
                                            <th>Tài khoản</th>
                                            <th>Trạng thái</th>
                                            <th>Tố cáo bị từ chối</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(userListData.users || []).map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.account}</td>
                                                <td style={{ color: user.disable ? 'red' : '#2ecc40' }}>
                                                    {user.disable ? 'Đã vô hiệu' : 'Đang hoạt động'}
                                                </td>
                                                <td
                                                    style={{
                                                        color: user.reportedCount < 3
                                                            ? '#2ecc40' // xanh lá
                                                            : user.reportedCount < 10
                                                                ? '#f1c40f' // vàng
                                                                : `rgb(${Math.min(255, user.reportedCount * 40)},${Math.max(0, 200 - user.reportedCount * 40)},0)` // chuyển dần sang đỏ
                                                    }}
                                                >
                                                    {user.reportedCount}
                                                </td>
                                                <td>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ marginRight: 8 }}
                                                        onClick={() => {
                                                            setUser(user)
                                                            setUserPopup(true)
                                                        }}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ marginRight: 8, color: 'green' }}
                                                        onClick={() => {
                                                            setUser(user)
                                                            dispatch(adminActions.getGraphRequest({
                                                                userId: user.id
                                                            }))
                                                            setGraphDataPopup(true)
                                                        }}
                                                    >
                                                        Biểu đồ
                                                    </button>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ color: 'red' }}
                                                        onClick={() => {
                                                            if (window.confirm(`Bạn có chắc chắn muốn ${!user.disable ? 'Vô hiệu' : 'Kích hoạt'} hóa tài khoản này?`)) {
                                                                dispatch(adminActions.disableUserRequest({
                                                                    userId: user.id,
                                                                    disable: !user.disable
                                                                }))
                                                            }
                                                        }}
                                                    >
                                                        {!user.disable ? 'Vô hiệu' : 'Kích hoạt'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.pages}>
                                <Pagination pageData={userListFilter} setPageData={setUserListFiler} totalPages={userListData.totalPages}></Pagination>
                            </div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.staff_header}>
                            <div className={styles.staff_header_title}>
                                <div className={styles.main_header}>Danh sách người bán</div>
                                <div className={styles.sub_header}>Dưới đây là danh sách toàn bộ các cửa hàng trên web</div>
                            </div>
                            <div style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tài khoản người bán..."
                                    style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', flex: 1 }}
                                    onChange={e => {
                                        setSearchVal(prev => ({
                                            ...prev,
                                            seller: e.target.value,
                                        }));
                                    }}
                                    value={searchVal.seller || ''}
                                />
                                <MainButton
                                    title="Tìm kiếm"
                                    onClick={() => {
                                        setSellerListFilter(pre => ({
                                            ...pre,
                                            text: searchVal.seller
                                        }))
                                    }}
                                />
                            </div>
                            <MainButton onClick={() => navigate(routes.profit)} className={styles.profitButton} title={'Xem doanh thu'}></MainButton>
                        </div>
                        <div className={styles.staffListWrapper}>
                            <div className={styles.table_wrapper}>
                                <table className={styles.staffTable}>
                                    <thead>
                                        <tr>
                                            <th>Tài khoản</th>
                                            <th>Trạng thái</th>
                                            <th>Tố cáo thành công</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(sellerListData.sellers || []).map((seller) => (
                                            <tr key={seller.id}>
                                                <td>{seller.account}</td>
                                                <td style={{ color: seller.disable ? 'red' : '#2ecc40' }}>
                                                    {seller.disable ? 'Đã vô hiệu' : 'Đang hoạt động'}
                                                </td>
                                                <td
                                                    style={{
                                                        color: user.reportedCount < 3
                                                            ? '#2ecc40' // xanh lá
                                                            : user.reportedCount < 10
                                                                ? '#f1c40f' // vàng
                                                                : `rgb(${Math.min(255, user.reportedCount * 40)},${Math.max(0, 200 - user.reportedCount * 40)},0)` // chuyển dần sang đỏ
                                                    }}
                                                >
                                                    {user.reportedCount}
                                                </td>
                                                <td>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ marginRight: 8 }}
                                                        onClick={() => {
                                                            setUser(seller)
                                                            setUserPopup(true)
                                                        }}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ marginRight: 8, color: 'green' }}
                                                        onClick={() => {
                                                            setUser(seller)
                                                            dispatch(adminActions.getGraphRequest({
                                                                userId: seller.id
                                                            }))
                                                            setGraphDataPopup(true)
                                                        }}
                                                    >
                                                        Biểu đồ
                                                    </button>
                                                    <button
                                                        className={styles.staffActionBtn}
                                                        style={{ color: 'red' }}
                                                        onClick={() => {
                                                            if (window.confirm(`Bạn có chắc chắn muốn ${!seller.disable ? 'Vô hiệu' : 'Kích hoạt'} hóa tài khoản này?`)) {
                                                                dispatch(adminActions.disableUserRequest({
                                                                    userId: seller.id,
                                                                    disable: !seller.disable
                                                                }))
                                                            }
                                                        }}
                                                    >
                                                        {!seller.disable ? 'Vô hiệu' : 'Kích hoạt'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.pages}>
                                <Pagination pageData={sellerListFilter} setPageData={setSellerListFilter} totalPages={sellerListData.totalPages}></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                userPopup
                    ?
                    <Popup
                        onClick={() => {
                            setUserPopup(false)
                        }}
                        highestZIndex={true}
                        height='400px'
                    >
                        <div style={{ padding: 24, minWidth: 350 }}>
                            <h2 style={{ marginBottom: 16 }}>Thông tin người dùng</h2>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Tên:</strong> {user.name || '---'}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Email:</strong> {user.email || '---'}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Tài khoản:</strong> {user.account || '---'}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Giới tính:</strong> {user.gender || '---'}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Vai trò:</strong> {user.roleName || '---'}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Số đơn tố cáo bị từ chối:</strong> {user.reportedCount || '---'}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Trạng thái:</strong> {user.disable ? 'Đã vô hiệu' : 'Đang hoạt động'}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Ngày tạo:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleString('vi-VN') : '---'}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Ngày cập nhật:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleString('vi-VN') : '---'}
                            </div>

                            <div style={{ marginTop: 24, textAlign: 'right' }}>
                                <MainButton
                                    className={styles.closeButton}
                                    title="Đóng"
                                    onClick={() => setUserPopup(false)}
                                />
                            </div>
                        </div>
                    </Popup>
                    :
                    undefined
            }

            {
                graphDataPopup
                    ?
                    <Popup
                        onClick={() => {
                            setGraphDataPopup(false)
                        }}
                        highestZIndex={true}
                    >
                        <div style={{ margin: '32px 0 0 0' }}>
                            <h3 style={{ marginBottom: 12, textAlign: 'center' }}>
                                {
                                    user.roleName === 'Seller'
                                        ?
                                        'Danh sách doanh thu của shop trong một tháng gần nhất'
                                        :
                                        'Danh sách 10 đơn hàng gần nhất của người dùng'
                                }

                            </h3>
                            {Array.isArray(graphData) && graphData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart
                                        data={graphData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fontSize: 12 }}
                                            tickFormatter={date =>
                                                date
                                                    ? new Date(date).toLocaleDateString('vi-VN')
                                                    : ''
                                            }
                                            label={{ value: 'Thời gian', position: 'insideBottom', offset: -5 }}
                                        />
                                        <YAxis tickFormatter={v => v.toLocaleString('vi-VN')} />
                                        <Tooltip
                                            formatter={value =>
                                                value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                            }
                                            labelFormatter={(label, payload) => {
                                                const item = payload && payload[0] && payload[0].payload;
                                                return item
                                                    ? `Sản phẩm: ${item.name}\nNgày: ${new Date(item.date).toLocaleDateString('vi-VN')}`
                                                    : label;
                                            }}
                                        />
                                        <Bar dataKey="price" fill="#8884d8" name="(VND)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div style={{ textAlign: 'center', color: '#888', margin: '40px 0' }}>
                                    Không có dữ liệu
                                </div>
                            )}
                        </div>
                    </Popup>
                    :
                    undefined
            }
        </div>
    );
}

export default AdminHome;
