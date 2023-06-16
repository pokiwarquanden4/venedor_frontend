import styles from './CategoryItems.module.scss';
import { useNavigate } from 'react-router-dom';

function CategoryItems({ data }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        if (data.name === 'All') {
          navigate('/category');
        } else {
          navigate(`/category/${data.name}`);
        }
      }}
    >
      <div className={styles.content}>
        <img className={styles.img} src={data.img}></img>
        <div className={styles.title}>{data.name}</div>
      </div>
    </div>
  );
}

export default CategoryItems;
