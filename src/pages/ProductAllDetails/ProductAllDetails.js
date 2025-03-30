import styles from './ProductAllDetails.module.scss';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productSearchSelector } from '../../redux/selectors/productSelector/productSearchSelector';
import { productSearchActions } from '../../redux/actions/product/ProductSearchAction';

function ProductAllDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const productUnsaveSelect = useSelector(productSearchSelector);
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(productSearchActions.searchProductByIdRequest({ id: params.id }));
  }, [params.id]);

  useEffect(() => {
    if (productUnsaveSelect.searchProductById) {
      const convertData = {
        ...productUnsaveSelect.searchProductById,
        listImgURL: productUnsaveSelect.searchProductById.listImgURL.split('___'),
      };
      setData(convertData);
    }
  }, [productUnsaveSelect.searchProductById]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_content}>
        {data ? <ProductDetails data={data} fullScreen={true}></ProductDetails> : undefined}
      </div>
    </div>
  );
}

export default ProductAllDetails;
