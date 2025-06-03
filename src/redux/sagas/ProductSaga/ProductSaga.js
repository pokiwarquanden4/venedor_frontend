//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  addProductAPI,
  editProductAPI,
  getSellerProductAPI,
  getCategoryAPI,
  getCommentAPI,
  searchCategoryProductAPI,
  searchProductAPI,
  searchProductByIdAPI,
  createCommentAPI,
  getShopRankingSalesAPI,
  getShopRankingRatingAPI,
  getShopRankingProductSalesAPI,
  getRankingDataAPI,
  getSalesToBuyAPI,
  askOverviewAIAPI,
  deleteProductAPI,
} from '../../../api/storageAPI/StorageAPI';
import { productActions } from '../../actions/product/ProductActions';
import { jwtCheck } from '../jwtCheck';
import { productSearchActions } from '../../actions/product/ProductSearchAction';
import {
  createCartProductAPI,
  deleteCartProductAPI,
  editCartProductAPI,
  getCartProductAPI,
} from '../../../api/userAPI/CartAPI';
import { cartActions } from '../../actions/product/cartActions';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { notificationActions } from '../../actions/notification/notificationAction';

function* addProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(addProductAPI, action.payload);
    yield put(productActions.createProductSuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Create Successfully'));
  } catch (err) {
    yield put(productActions.createProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getSellerProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(getSellerProductAPI, action.payload);

    yield put(productActions.getSellerProductSuccess(products.data));

    jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productActions.getSellerProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* editProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(editProductAPI, action.payload);
    yield put(productActions.editProductSuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Edit Successfully'));
  } catch (err) {
    yield put(productActions.editProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* deleteProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(deleteProductAPI, action.payload);
    yield put(productActions.deleteProductSuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Delete Successfully'));
  } catch (err) {
    yield put(productActions.deleteProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* searchProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(searchProductAPI, action.payload);
    yield put(productSearchActions.searchProductSuccess(products.data));

    yield jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productSearchActions.searchProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* quickSearchProductSaga(action) {
  try {
    const products = yield call(searchProductAPI, { ...action.payload, limit: 10 });
    yield put(productSearchActions.quickSearchProductSuccess(products.data));

    yield jwtCheck(products);
  } catch (err) {
    yield put(productSearchActions.quickSearchProductFailure(err.response.data));
  }
}

function* searchProductByIdSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(searchProductByIdAPI, action.payload);
    yield put(productSearchActions.searchProductByIdSuccess(products.data));

    yield jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productSearchActions.searchProductByIdFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getCartProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(getCartProductAPI, action.payload);
    yield put(cartActions.getCartProductSuccess(products.data));

    yield jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(cartActions.getCartProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}
function* deleteCartProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(deleteCartProductAPI, action.payload);
    yield put(cartActions.deleteCartProductSuccess(products.data));
    yield put(cartActions.getCartProductRequest());

    yield jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Delete Successfully'));
  } catch (err) {
    yield put(cartActions.deleteCartProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}
function* createCartProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(createCartProductAPI, action.payload);
    yield put(cartActions.createCartProductSuccess(products.data));
    yield put(cartActions.getCartProductRequest());

    yield jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(cartActions.createCartProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* editCartProductSaga(action) {
  try {

    const products = yield call(editCartProductAPI, action.payload);
    yield put(cartActions.editCartProductSuccess(products.data));
    yield put(cartActions.getCartProductRequest());
    yield jwtCheck(products);
  } catch (err) {
    yield put(cartActions.editCartProductFailure(err.response.data));
  }
}

function* searchCategorySaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(searchCategoryProductAPI, action.payload);
    yield put(productSearchActions.searchCategoryProductSuccess(products.data));

    yield jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productSearchActions.searchCategoryProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getShopRankingSalesSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));
    const ranks = yield call(getShopRankingSalesAPI, action.payload);
    yield put(productActions.getShopRankingSalesSuccess(ranks.data));

    yield jwtCheck(ranks);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productActions.getShopRankingSalesFailure(err.response));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getShopRankingRatingSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));
    const ranks = yield call(getShopRankingRatingAPI, action.payload);
    yield put(productActions.getShopRankingRatingSuccess(ranks.data));

    yield jwtCheck(ranks);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productActions.getShopRankingRatingFailure(err.response));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getRankingDataSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));
    const ranks = yield call(getRankingDataAPI, action.payload);
    yield put(productActions.getRankingDataSuccess(ranks.data));

    yield jwtCheck(ranks);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productActions.getRankingDataFailure(err.response));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getProductSalesDataSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));
    const ranks = yield call(getShopRankingProductSalesAPI, action.payload);
    yield put(productActions.getProductSalesDataSuccess(ranks.data));

    yield jwtCheck(ranks);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productActions.getProductSalesDataFailure(err.response));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getSalesToBuyDataSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));
    const ranks = yield call(getSalesToBuyAPI, action.payload);
    yield put(productActions.getSalesToBuySuccess(ranks.data));

    yield jwtCheck(ranks);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productActions.getSalesToBuyFailure(err.response));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getCommentSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));
    const comment = yield call(getCommentAPI, action.payload);
    yield put(productActions.getCommentSuccess(comment.data));

    yield jwtCheck(comment);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productActions.getCommentFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* createCommentSaga(action) {
  try {
    const comment = yield call(createCommentAPI, action.payload);
    yield put(productActions.createCommentSuccess(comment.data));

    yield jwtCheck(comment);
  } catch (err) {
    yield put(productActions.createCommentFailure(err.response.data));
  }
}

function* getCategory(action) {
  try {
    const products = yield call(getCategoryAPI, action.payload);
    yield put(productActions.getCategorySuccess(products.data));

    yield jwtCheck(products);
  } catch (err) {
    yield put(productActions.getCategoryFailure(err.response.data));
  }
}

function* askOverviewAISaga(action) {
  try {
    const comment = yield call(askOverviewAIAPI, action.payload);
    yield put(productActions.askOverviewAISuccess(comment.data));

    yield jwtCheck(comment);
  } catch (err) {
    yield put(productActions.askOverviewAIFailure(err.response.data));
  }
}

function* productSagas() {
  yield takeLatest(productActions.createProductRequest, addProductSaga);
  yield takeLatest(productActions.getSellerProductRequest, getSellerProductSaga);
  yield takeLatest(productActions.editProductRequest, editProductSaga);
  yield takeLatest(productActions.deleteProductRequest, deleteProductSaga);
  yield takeLatest(productSearchActions.quickSearchProductRequest, quickSearchProductSaga);
  yield takeLatest(productSearchActions.searchProductRequest, searchProductSaga);
  yield takeLatest(productSearchActions.searchProductByIdRequest, searchProductByIdSaga);
  yield takeLatest(cartActions.getCartProductRequest, getCartProductSaga);
  yield takeLatest(cartActions.deleteCartProductRequest, deleteCartProductSaga);
  yield takeLatest(cartActions.createCartProductRequest, createCartProductSaga);
  yield takeLatest(cartActions.editCartProductRequest, editCartProductSaga);
  yield takeLatest(productSearchActions.searchCategoryProductRequest, searchCategorySaga);
  yield takeLatest(productActions.getCommentRequest, getCommentSaga);
  yield takeLatest(productActions.createCommentRequest, createCommentSaga);
  yield takeLatest(productActions.getCategoryRequest, getCategory);
  yield takeLatest(productActions.getShopRankingSalesRequest, getShopRankingSalesSaga);
  yield takeLatest(productActions.getShopRankingRatingRequest, getShopRankingRatingSaga);
  yield takeLatest(productActions.getRankingDataRequest, getRankingDataSaga);
  yield takeLatest(productActions.getProductSalesDataRequest, getProductSalesDataSaga);
  yield takeLatest(productActions.getSalesToBuyRequest, getSalesToBuyDataSaga);
  yield takeLatest(productActions.askOverviewAIRequest, askOverviewAISaga);
}

export default productSagas;
