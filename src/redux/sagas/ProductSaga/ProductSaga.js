//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  addProductAPI,
  editProductAPI,
  getAllProductAPI,
  getCategoryAPI,
  getCommentAPI,
  searchCategoryProductAPI,
  searchProductAPI,
  searchProductByIdAPI,
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

function* getAllProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(getAllProductAPI, action.payload);
    yield put(productActions.getAllProductSuccess(products.data));

    jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productActions.getAllProductFailure(err.response.data));

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

function* searchProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(searchProductAPI, action.payload);
    yield put(productSearchActions.searchProductSuccess(products.data));

    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productSearchActions.searchProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* quickSearchProductSaga(action) {
  try {
    const products = yield call(searchProductAPI, action.payload);
    yield put(productSearchActions.quickSearchProductSuccess(products.data));
  } catch (err) {
    yield put(productSearchActions.quickSearchProductFailure(err.response.data));
  }
}

function* searchProductByIdSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(searchProductByIdAPI, action.payload);
    yield put(productSearchActions.searchProductByIdSuccess(products.data));

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

    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(cartActions.createCartProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* editCartProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(editCartProductAPI, action.payload);
    yield put(cartActions.editCartProductSuccess(products.data));
    yield put(cartActions.getCartProductRequest());

    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(cartActions.editCartProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* searchCategorySaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(searchCategoryProductAPI, action.payload);
    yield put(productSearchActions.searchCategoryProductSuccess(products.data));

    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(productSearchActions.searchCategoryProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getCommentSaga(action) {
  try {
    const products = yield call(getCommentAPI, action.payload);
    yield put(productActions.getCommentSuccess(products.data));
  } catch (err) {
    yield put(productActions.getCommentFailure(err.response.data));
  }
}

function* getCategory(action) {
  try {
    const products = yield call(getCategoryAPI, action.payload);
    yield put(productActions.getCategorySuccess(products.data));
  } catch (err) {
    yield put(productActions.getCategoryFailure(err.response.data));
  }
}

function* productSagas() {
  yield takeLatest(productActions.createProductRequest, addProductSaga);
  yield takeLatest(productActions.getAllProductRequest, getAllProductSaga);
  yield takeLatest(productActions.editProductRequest, editProductSaga);
  yield takeLatest(productSearchActions.quickSearchProductRequest, quickSearchProductSaga);
  yield takeLatest(productSearchActions.searchProductRequest, searchProductSaga);
  yield takeLatest(productSearchActions.searchProductByIdRequest, searchProductByIdSaga);
  yield takeLatest(cartActions.getCartProductRequest, getCartProductSaga);
  yield takeLatest(cartActions.deleteCartProductRequest, deleteCartProductSaga);
  yield takeLatest(cartActions.createCartProductRequest, createCartProductSaga);
  yield takeLatest(cartActions.editCartProductRequest, editCartProductSaga);
  yield takeLatest(productSearchActions.searchCategoryProductRequest, searchCategorySaga);
  yield takeLatest(productActions.getCommentRequest, getCommentSaga);
  yield takeLatest(productActions.getCategoryRequest, getCategory);
}

export default productSagas;
