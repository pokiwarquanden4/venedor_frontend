import { useNavigate, useParams } from 'react-router-dom';
import MainButton from '../../../components/MainButton/MainButton';
import styles from './CategoryFilterPopUp.module.scss';
import { useSelector } from 'react-redux';
import { productSelector } from '../../../redux/selectors/productSelector/productSelector';

function CategoryFilterPopUp() {
  const productSelect = useSelector(productSelector);
  const params = useParams();
  const navigate = useNavigate();
  const currentCategory = params.category ? params.category : 'All';

  return (
    <div className={styles.filterPopUp_wrapper}>
      <div className={styles.category}>
        <div className={styles.category_header}>Category</div>
        <div className={styles.category_content}>
          {productSelect.category.category ? Object.keys(productSelect.category.category).map((id, index) => {
            const item = productSelect.category.category[id]

            return (
              <MainButton
                key={index}
                className={styles.content}
                title={item.name}
                onClick={() => {
                  navigate(`/category/${id}`);
                }}
                active={currentCategory.toLowerCase() === item.name.toLowerCase()}
              ></MainButton>
            );
          }) : undefined}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilterPopUp;
