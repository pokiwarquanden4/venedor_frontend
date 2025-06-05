import styles from './Search.module.scss';
import { SearchIcon } from '../../asset/img/HeaderIcon';
import { useCallback, useEffect, useState } from 'react';
import Items from '../../components/Items/Items';
import PriceRange from '../../components/PriceRange/PriceRange';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSelector } from '../../redux/selectors/accountSelector/LoginSelector';
import { productSearchSelector } from '../../redux/selectors/productSelector/productSearchSelector';
import { productSearchActions } from '../../redux/actions/product/ProductSearchAction';

function Search() {
  const dispatch = useDispatch();
  const productSelect = useSelector(productSearchSelector);
  const loginselect = useSelector(LoginSelector);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [range, setRange] = useState();
  const [priceValue, setPriceValue] = useState();

  const getTruePrice = useCallback((item) => {
    return Math.ceil(item.price - item.price * (item.saleOff / 100));
  }, []);

  const getHighestPrice = useCallback((data) => {
    let max = 0;
    data.forEach((item) => {
      const discount = getTruePrice(item);
      if (discount > max) {
        max = discount;
      }
    });
    return max;
  }, [getTruePrice]);

  useEffect(() => {
    if (productSelect.searchProducts) {
      setData(productSelect.searchProducts);
    }
  }, [productSelect.searchProducts]);

  useEffect(() => {
    if (data) {
      const highestMoney = getHighestPrice(data);
      setRange(highestMoney);
      setPriceValue({ min: 0, max: highestMoney });
    }
  }, [data, getHighestPrice]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_content}>
        <div className={styles.search_bar_wrapper}>
          <div className={styles.search_bar_header}>
            {data.length !== 0
              ? `${data.length} kết quả cho "${searchValue}"`
              : 'Tìm kiếm sản phẩm trên trang của chúng tôi'}
          </div>
          {data.length !== 0 ? (
            <div className={styles.items}>
              {data.map((item, index) => {
                if (getTruePrice(item) <= priceValue.max && getTruePrice(item) >= priceValue.min) {
                  return <Items preview={true} data={item} key={index} vertical={true}></Items>;
                } else {
                  return undefined;
                }
              })}
            </div>
          ) : (
            <div className={styles.search_bar}>
              <input
                placeholder="Tìm kiếm trong cửa hàng"
                className={styles.search_input}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              ></input>
              <div
                className={styles.search_button}
                onClick={() => {
                  dispatch(
                    productSearchActions.searchProductRequest({
                      content: searchValue,
                    })
                  );
                }}
              >
                <SearchIcon className={styles.search_icon}></SearchIcon>
              </div>
            </div>
          )}
        </div>
        {range ? (
          <PriceRange
            min={0}
            max={range}
            step={1}
            value={priceValue}
            onChange={setPriceValue}
          ></PriceRange>
        ) : undefined}
      </div>
    </div>
  );

}

export default Search;
