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

function HomeCategory() {
  const params = useParams();
  const productSearchSelect = useSelector(productSearchSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [numberPerPage, setNumberPerPage] = useState('Show: 16');
  const [filter, setFilter] = useState('Feature');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  const [filterPopUp, setFilterPopUp] = useState(false);

  useEffect(() => {
    let pageContentTemp = [];
    let temp = [];
    const numberPerPageConvert = parseInt(numberPerPage.match(/\d+/)[0]);
    for (let i = 0; i < data.length; i++) {
      if (temp.length < numberPerPageConvert) {
        temp.push(data[i]);
      } else {
        pageContentTemp.push(temp);
        temp = [];
        temp.push(data[i]);
      }
      if (i === data.length - 1) {
        pageContentTemp.push(temp);
      }
    }
    setPageContent(pageContentTemp);
  }, [filter, numberPerPage, data]);

  useEffect(() => {
    const filterTemp = filter;
    const tempData = data;
    switch (filterTemp) {
      case 'Feature':
        break;
      case 'Best Selling':
        tempData.sort((a, b) => {
          return a.sold > b.sold;
        });
        break;
      case 'Alphabetically,A-Z':
        tempData.sort((a, b) => {
          return a.description.localeCompare(b.description);
        });
        break;
      case 'Alphabetically,Z-A':
        tempData.sort((a, b) => {
          return b.description.localeCompare(a.description);
        });
        break;
      case 'Price, low to high':
        tempData.sort((a, b) => {
          const truePriceA = a.price - a.price * (a.saleOff / 100); // Calculate true price for object a
          const truePriceB = b.price - b.price * (b.saleOff / 100); // Calculate true price for object b
          return truePriceA - truePriceB; // Compare the true prices
        });
        break;
      case 'Price, high to low':
        tempData.sort((a, b) => {
          const truePriceA = a.price - a.price * (a.saleOff / 100); // Calculate true price for object a
          const truePriceB = b.price - b.price * (b.saleOff / 100); // Calculate true price for object b
          return truePriceB - truePriceA; // Compare the true prices
        });
        break;
      case 'Date, old to new':
        tempData.sort((a, b) => {
          const dateA = new Date(a.updatedAt); // Convert updatedAt string to a Date object for object a
          const dateB = new Date(b.updatedAt); // Convert updatedAt string to a Date object for object b
          return dateA - dateB; // Compare the dates
        });
        break;
      case 'Date, new to old':
        tempData.sort((a, b) => {
          const dateA = new Date(a.updatedAt); // Convert updatedAt string to a Date object for object a
          const dateB = new Date(b.updatedAt); // Convert updatedAt string to a Date object for object b
          return dateB - dateA; // Compare the dates
        });
        break;
      default:
        break;
    }
  }, [filter, data]);

  useEffect(() => {
    setData(productSearchSelect.categorySearchProduct);
  }, [productSearchSelect.categorySearchProduct]);

  useEffect(() => {
    dispatch(productSearchActions.searchCategoryProductRequest({ category: params.category }));
  }, [params.category]);

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
                  setNumberPerPage(input);
                }}
              ></Collapse>
            </div>
            <div className={styles.price}></div>
            {pageContent.length > 1 && (
              <div className={styles.pages}>
                {currentPage > 1 && (
                  <div
                    className={styles.leftArrow}
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                  >
                    <LeftArrowIcon className={styles.rightArrow_icon}></LeftArrowIcon>
                  </div>
                )}
                {pageContent.map((item, index) => {
                  return (
                    <div
                      className={`${styles.paging} ${
                        currentPage === index + 1 ? styles.paging_active : ''
                      }`}
                      key={index}
                      onClick={() => {
                        setCurrentPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </div>
                  );
                })}
                {currentPage < pageContent.length && (
                  <div
                    className={styles.rightArrow}
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                  >
                    <RightArrowIcon className={styles.leftArrow_icon}></RightArrowIcon>
                  </div>
                )}
              </div>
            )}
          </div>
          {pageContent.map((items, index) => {
            return (
              currentPage === index + 1 && (
                <div className={styles.content} key={index}>
                  {items.map((item, index) => {
                    return <Items data={item} vertical={true} key={index}></Items>;
                  })}
                </div>
              )
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default HomeCategory;
