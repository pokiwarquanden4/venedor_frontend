import "react-multi-carousel/lib/styles.css";
import styles from './Category.module.scss';
import CategoryItems from './CategoryItems/CategoryItems';
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import { productSelector } from "../../../redux/selectors/productSelector/productSelector";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
function Category() {
  const productSelect = useSelector(productSelector);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Shop by Category</div>
      <div className={styles.contents}>
        <div className={styles.content}>
          <div className={styles.items}>
            {
              productSelect.category.category
                ?
                <Carousel
                  swipeable={true}
                  draggable={true}
                  // showDots={true}
                  responsive={responsive}
                  infinite={true}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {Object.keys(productSelect.category.category).map((key) => {
                    const data = productSelect.category.category[key]
                    return <CategoryItems key={key} id={key} data={data}></CategoryItems>
                  })}
                </Carousel>
                :
                undefined
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
