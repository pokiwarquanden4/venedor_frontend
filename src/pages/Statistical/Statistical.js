import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './Statistical.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../redux/actions/product/ProductActions';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';
// Màu sắc cho các phần của biểu đồ tròn
const COLORS = [
    '#D32F2F', // ⭐ 1 sao - đỏ đậm
    '#F57C00', // ⭐ 2 sao - cam đất
    '#FBC02D', // ⭐ 3 sao - vàng tươi
    '#388E3C', // ⭐ 4 sao - xanh lá cây đậm
    '#1976D2', // ⭐ 5 sao - xanh dương (nổi bật, tích cực)
];

const dateFilters = [
    { value: 1, content: '1 day' },
    { value: 7, content: '7 days' },
    { value: 30, content: '1 month' },
    { value: 90, content: '3 months' },
    { value: 180, content: '6 months' },
    { value: 365, content: '1 year' },
    { value: 730, content: '2 years' },
    { value: 1095, content: '3 years' },
    { value: 1825, content: '5 years' },
    { value: 3650, content: 'All' }
];


function Statistical() {
    const dispatch = useDispatch()
    const productSelect = useSelector(productSelector)
    const [ratingData, setRatingData] = useState([])
    const [sales, setSales] = useState([])
    const [filter, setFilter] = useState({
        salesFiler: 365
    })

    // Hàm định dạng giá trị VND
    const formatVND = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    useEffect(() => {
        dispatch(productActions.getShopRankingRequest(filter))
    }, [dispatch, filter])

    useEffect(() => {
        setRatingData(productSelect.shopRanking.ratingData)
    }, [productSelect.shopRanking.ratingData])

    useEffect(() => {
        setSales(productSelect.shopRanking.sales)
    }, [productSelect.shopRanking.sales])

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.header}>
                    <div className={styles.main_header}>Overview Statistics</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.circleChart}>
                        <h3 className={styles.chartTitle}>Rating Distribution (1-5 Stars)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={ratingData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                >
                                    {ratingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => {
                                        const percent = (props.payload.percent).toFixed(2); // Tính phần trăm từ props.payload.percent
                                        return [`${name} (${value}) - ${percent}%`];
                                    }}
                                />
                                <Legend
                                    formatter={(value) => `${value.length} ⭐`}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={styles.barChart}>
                        <div className={styles.barChart_header}>
                            <h3 className={styles.chartTitle}>Sales Revenue</h3>
                            <select
                                value={filter.salesFiler}
                                className={styles.category_input}
                                onChange={(e) => setFilter({
                                    salesFiler: e.target.value
                                })}
                            >
                                {dateFilters.map((filter, index) => (
                                    <option value={filter.value} key={index}>
                                        {filter.content}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={sales}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis tickFormatter={formatVND} />
                                <Tooltip formatter={(value) => formatVND(value)} />
                                <Legend />
                                <Bar dataKey="sales" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Statistical;