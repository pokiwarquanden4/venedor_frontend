import { useNavigate } from 'react-router-dom';
import styles from './SearchPopup.module.scss';

function SearchPopup({ data }) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {data.length !== 0
          ? data.map((item, index) => {
              return (
                <div
                  className={styles.item}
                  key={index}
                  onClick={() => {
                    navigate(`/category/${item.category}/${item.id}`);
                  }}
                >
                  <div key={index} className={styles.img_wrapper}>
                    <img src={item.imgURL} className={styles.img}></img>
                  </div>
                  <div className={styles.description}>
                    <div className={styles.description_content}>{item.description}</div>
                    <div className={styles.description_price}>
                      <div className={styles.newPrice}>
                        ${item.price - item.price * (item.saleOff / 100)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : undefined}
      </div>
    </div>
  );
}

export default SearchPopup;
