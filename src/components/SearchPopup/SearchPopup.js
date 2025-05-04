import { useNavigate } from 'react-router-dom';
import styles from './SearchPopup.module.scss';
import { useSelector } from 'react-redux';
import { productSearchSelector } from '../../redux/selectors/productSelector/productSearchSelector';

function SearchPopup({ data }) {
  const navigate = useNavigate();
  const productSelect = useSelector(productSearchSelector);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {productSelect.quickSearchLoading ? (
          <div className={styles.loading}>Searching...</div> // Hiển thị loading
        ) : data.length !== 0 ? (
          data.map((item, index) => {
            return (
              <div
                className={styles.item}
                key={index}
                onClick={() => {
                  navigate(`/category/${item.category}/${item.id}`);
                }}
              >
                <div key={index} className={styles.img_wrapper}>
                  <img alt='' src={item.imgURL} className={styles.img}></img>
                </div>
                <div className={styles.description}>
                  <div className={styles.description_content}>{item.productName}</div>
                  <div className={styles.description_price}>
                    <div className={styles.newPrice}>
                      ${item.price - item.price * (item.saleOff / 100)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noData}>No products found</div> // Hiển thị khi không có dữ liệu
        )}
      </div>
    </div>
  );
}

export default SearchPopup;