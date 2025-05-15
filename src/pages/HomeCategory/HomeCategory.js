import { Fragment, useEffect, useState } from 'react';
import Collapse from '../../components/Collapse/Collapse';
import styles from './HomeCategory.module.scss';
import Items from '../../components/Items/Items';
import { useDispatch, useSelector } from 'react-redux';
import { productSearchSelector } from '../../redux/selectors/productSelector/productSearchSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { productSearchActions } from '../../redux/actions/product/ProductSearchAction';
import Pagination from '../../components/Pagination/Pagination';
import { productSelector } from '../../redux/selectors/productSelector/productSelector';

function HomeCategory() {
  const navigate = useNavigate()
  const params = useParams();
  const productSearchSelect = useSelector(productSearchSelector);
  const productSelect = useSelector(productSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('Feature')
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 16,
    categoryId: params.id
  })
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    setPageData((preData) => {
      return {
        ...preData,
        categoryId: params.id
      }
    })
  }, [params.id])

  useEffect(() => {
    if (!productSelect.category) return
    setSelectedCategory(params.id)
  }, [params.id, productSelect.category])

  useEffect(() => {
    if (!productSearchSelect.categorySearchProduct) return
    setData(productSearchSelect.categorySearchProduct);
  }, [productSearchSelect.categorySearchProduct]);

  useEffect(() => {
    dispatch(productSearchActions.searchCategoryProductRequest({
      categoryId: pageData.categoryId,
      page: pageData.page,
      limit: pageData.limit,
      sortType: filter
    }));
  }, [dispatch, filter, pageData]);

  return (
    <Fragment>
      {/* {filterPopUp ? (
        <Popup
          onClick={() => {
            setFilterPopUp(false);
          }}
        >
          <CategoryFilterPopUp setPopup={setFilterPopUp}></CategoryFilterPopUp>
        </Popup>
      ) : undefined} */}
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <div className={styles.filter_content}>
            {productSelect.category
              ? Object.keys(productSelect.category.category).map((key) => {
                const item = productSelect.category.category[key];

                return (
                  <div
                    key={key}
                    onClick={() => {
                      navigate(`/category/${key}`);
                    }}
                    className={`${styles.filter_item} ${selectedCategory === key ? styles.active : ''
                      }`}
                  >
                    {item.name}
                  </div>
                );
              })
              : undefined}
          </div>
        </div>
        <div className={styles.wrapper_content}>
          <div className={styles.header}>
            <div className={styles.feature}>
              <Collapse
                onClick={(input) => {
                  setFilter(input);
                }}
                title="Feature"
                content={[
                  'Feature',
                  'Best Selling',
                  'Alphabetically,A-Z',
                  'Alphabetically,Z-A',
                  'Price, low to high',
                  'Price, high to low',
                  'Date, old to new',
                  'Date, new to old',
                ]}
              ></Collapse>
            </div>
            <div className={styles.show}>
              <Collapse
                title="Show: 16"
                content={['Show: 16', 'Show: 24', 'Show: 32']}
                onClick={(input) => {
                  const pageNum = Number(input.replace('Show: ', ''))
                  setPageData((preData) => {
                    return {
                      ...preData,
                      limit: pageNum,
                      page: 1
                    }
                  })
                }}
              ></Collapse>
            </div>
            <div className={styles.price}></div>
            <Pagination pageData={pageData} setPageData={setPageData} totalPages={data.totalPages}></Pagination>
          </div>
          <div className={styles.content}>
            {data.products && data.products.map((item, index) => {
              return <Items data={item} vertical={true} key={index}></Items>;
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomeCategory;
