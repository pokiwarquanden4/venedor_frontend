import Category from './Category/Category';
import styles from './Home.module.scss';
import ProductList from './ProductList/ProductList';

function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Category></Category>
        <ProductList></ProductList>
      </div>
    </div>
  );
}

export default Home;
