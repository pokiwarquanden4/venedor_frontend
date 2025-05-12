import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';
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
    const [rankingData, setRankingData] = useState({})
    const [ratingData, setRatingData] = useState([])
    const [sales, setSales] = useState([])
    const [productSales, setProductSales] = useState([])
    const [salesToBuy, setSalesToBuy] = useState([])
    const [filter, setFilter] = useState({
        salesFiler: 365,
        productSalesFilter: 365,
    })

    // Hàm định dạng giá trị VND
    const formatVND = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    useEffect(() => {
        dispatch(productActions.getShopRankingSalesRequest({
            salesFiler: filter.salesFiler
        }))
    }, [dispatch, filter.salesFiler])

    useEffect(() => {
        dispatch(productActions.getShopRankingRatingRequest())
    }, [dispatch])

    useEffect(() => {
        dispatch(productActions.getRankingDataRequest())
    }, [dispatch])

    useEffect(() => {
        dispatch(productActions.getSalesToBuyRequest())
    }, [dispatch])

    useEffect(() => {
        dispatch(productActions.getProductSalesDataRequest({
            productSalesFilter: filter.productSalesFilter
        }))
    }, [dispatch, filter.productSalesFilter])

    useEffect(() => {
        setRatingData(productSelect.shopRanking.ratingData)
    }, [productSelect.shopRanking.ratingData])

    useEffect(() => {
        setSalesToBuy(productSelect.shopRanking.salesToBuy)
    }, [productSelect.shopRanking.salesToBuy])

    useEffect(() => {
        setProductSales(productSelect.shopRanking.productSales)
    }, [productSelect.shopRanking.productSales])

    useEffect(() => {
        setSales(productSelect.shopRanking.sales)
    }, [productSelect.shopRanking.sales])

    useEffect(() => {
        setRankingData(productSelect.shopRanking.rankingData)
    }, [productSelect.shopRanking.rankingData])

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={{ background: 'white', border: '1px solid #ccc', padding: 10 }}>
                    <p><strong>{data.productName}</strong></p>
                    <p>Views: {data.viewNumber}</p>
                    <p>Purchases: {data.salesNumber}</p>
                    <p>Conversion Rate: {(data.rate || 0).toFixed(2)}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.header}>
                    <div className={styles.main_header}>Overview Statistics</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.chartRow}>
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
                        <div className={styles.rankingData}>
                            <h3 className={styles.chartTitle}>Overview</h3>
                            <ul>
                                <li>Sales History: {rankingData.salesHistory}</li>
                                <li>Sales Number: {rankingData.salesNumber}</li>
                                <li>View: {rankingData.view}</li>
                                <li>View to Buy: {(rankingData.viewToBuy || 0).toFixed(2)}%</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.barChart}>
                        <div className={styles.barChart_header}>
                            <h3 className={styles.chartTitle}>Sales Revenue</h3>
                            <select
                                value={filter.salesFiler}
                                className={styles.category_input}
                                onChange={(e) => setFilter({
                                    ...filter,
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
                            {sales.length > 0 ? (
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
                            ) : (
                                <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                                    No data available
                                </div>
                            )}
                        </ResponsiveContainer>
                    </div>
                    <div className={styles.barChart}>
                        <div className={styles.barChart_header}>
                            <h3 className={styles.chartTitle}>Number of Sales by Product</h3>
                            <select
                                value={filter.productSalesFilter}
                                className={styles.category_input}
                                onChange={(e) => setFilter({
                                    ...filter,
                                    productSalesFilter: e.target.value
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
                            {productSales.length > 0 ? (
                                <BarChart
                                    data={productSales}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" hide />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name, props) => {
                                            const saleQuantity = props.payload?.saleNumber || 0; // Lấy số lượng bán hoặc mặc định là 0
                                            return [`Sold Number: ${saleQuantity}`];
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="saleNumber" fill="#8884d8" />
                                </BarChart>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                                    No data available
                                </div>
                            )}
                        </ResponsiveContainer>
                    </div>
                    <div className={styles.barChart}>
                        <div className={styles.barChart_header}>
                            <h3 className={styles.chartTitle}>Comparison of Views and Purchases</h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={salesToBuy}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="viewNumber" fill="#8884d8" name="Views"></Bar>
                                <Bar dataKey="salesNumber" fill="#82ca9d" name="Purchases" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Statistical;