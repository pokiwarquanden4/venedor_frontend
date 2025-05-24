import Category from './Category/Category';
import styles from './Home.module.scss';
import Inspires from './Inspires/Inspires';
import ProductList from './ProductList/ProductList';

function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Inspires></Inspires>
        <Category></Category>
        <ProductList></ProductList>
      </div>
    </div>
  );
}

export default Home;
