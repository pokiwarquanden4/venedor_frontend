import Category from './Category/Category';
import styles from './Home.module.scss';
import Inspires from './Inspires/Inspires';
import ProductList from './ProductList/ProductList';
import DailyDeal from './dailyDeal/DailyDeal';

function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Inspires></Inspires>
        {/* <DailyDeal></DailyDeal> */}
        <Category></Category>
        <ProductList></ProductList>
      </div>
    </div>
  );
}

export default Home;
