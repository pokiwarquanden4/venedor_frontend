import { Fragment, useEffect, useState } from 'react';
import { FilterIcon, LeftArrowIcon, RightArrowIcon } from '../../asset/img/ItemsIcon';
import Collapse from '../../components/Collapse/Collapse';
import styles from './HomeCategory.module.scss';
import Items from '../../components/Items/Items';
import { useDispatch, useSelector } from 'react-redux';
import { productSearchSelector } from '../../redux/selectors/productSelector/productSearchSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { productSearchActions } from '../../redux/actions/product/ProductSearchAction';
import Popup from '../../components/Popup/Popup';
import CategoryFilterPopUp from '../Category/CategoryFilterPopUp/CategoryFilterPopUp';
import Pagination from '../../components/Pagination/Pagination';

function HomeCategory() {
  const params = useParams();
  const productSearchSelect = useSelector(productSearchSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('Feature')
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [pageData, setPageData] = useState({
    page: 1,
    limit: 16,
    categoryId: params.id
  })

  useEffect(() => {
    setPageData((preData) => {
      return {
        ...preData,
        categoryId: params.id
      }
    })
  }, [params.id])
  console.log(data.products)
  useEffect(() => {
    const filterTemp = filter;
    const tempData = data.products;
    if (!tempData) return
    switch (filterTemp) {
      case 'Feature':
        tempData.sort(() => Math.random() - 0.5);
        break;

      case 'Best Selling':
        tempData.sort((a, b) => b.sold - a.sold);
        break;

      case 'Alphabetically,A-Z':
        tempData.sort((a, b) => a.description.localeCompare(b.description));
        break;

      case 'Alphabetically,Z-A':
        tempData.sort((a, b) => b.description.localeCompare(a.description));
        break;

      case 'Price, high to low':
        tempData.sort((a, b) => {
          const truePriceA = a.price - a.price * (a.saleOff / 100);
          const truePriceB = b.price - b.price * (b.saleOff / 100);
          return truePriceB - truePriceA;
        });
        break;

      case 'Price, low to high':
        tempData.sort((a, b) => {
          const truePriceA = a.price - a.price * (a.saleOff / 100);
          const truePriceB = b.price - b.price * (b.saleOff / 100);
          return truePriceA - truePriceB;
        });
        break;

      case 'Date, old to new':
        tempData.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        break;

      case 'Date, new to old':
        tempData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;

      default:
        break;
    }

  }, [filter, data]);

  useEffect(() => {
    if (!productSearchSelect.categorySearchProduct) return
    setData(productSearchSelect.categorySearchProduct);
  }, [productSearchSelect.categorySearchProduct]);

  useEffect(() => {
    dispatch(productSearchActions.searchCategoryProductRequest({
      categoryId: pageData.categoryId,
      page: pageData.page,
      limit: pageData.limit
    }));
  }, [dispatch, pageData]);

  return (
    <Fragment>
      {filterPopUp ? (
        <Popup
          onClick={() => {
            setFilterPopUp(false);
          }}
        >
          <CategoryFilterPopUp></CategoryFilterPopUp>
        </Popup>
      ) : undefined}
      <div className={styles.wrapper}>
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
            <div
              className={styles.filter}
              onClick={() => {
                setFilterPopUp(true);
              }}
            >
              <div className={styles.filter_header}>Filter</div>
              <div className={styles.filter_icon_wrapper}>
                <FilterIcon className={styles.filter_icon}></FilterIcon>
              </div>
            </div>
            <div className={styles.filter_content}></div>
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
