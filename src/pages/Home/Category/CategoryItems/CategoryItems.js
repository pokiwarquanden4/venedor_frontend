import styles from './CategoryItems.module.scss';
import { useNavigate } from 'react-router-dom';

function CategoryItems({ data, id }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        navigate(`/category/${id}`);
      }}
    >
      <div className={styles.content}>
        <img alt='' className={styles.img} src={data.icon}></img>
        <div className={styles.title}>{data.name}</div>
      </div>
    </div>
  );
}

export default CategoryItems;
