//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getBestSellerProductAPI,
  getDailyDealsProductAPI,
  getFeatureProductAPI,
  getLatestProductAPI,
} from '../../../api/storageAPI/StorageAPI';
import { jwtCheck } from '../jwtCheck';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { homeActions } from '../../actions/product/homeActions';

function* dailyDealsProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(getDailyDealsProductAPI, action.payload);
    yield put(homeActions.dailyDealsProductSuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(homeActions.dailyDealsProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}
function* latestProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(getLatestProductAPI, action.payload);
    yield put(homeActions.latestProductSuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(homeActions.latestProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}
function* bestSellerProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(getBestSellerProductAPI, action.payload);
    yield put(homeActions.bestSellerProductSuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(homeActions.bestSellerProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}
function* featureProductSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(getFeatureProductAPI, action.payload);
    yield put(homeActions.featureProductSuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(homeActions.featureProductFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* homeSagas() {
  yield takeLatest(homeActions.dailyDealsProductRequest, dailyDealsProductSaga);
  yield takeLatest(homeActions.latestProductRequest, latestProductSaga);
  yield takeLatest(homeActions.bestSellerProductRequest, bestSellerProductSaga);
  yield takeLatest(homeActions.featureProductRequest, featureProductSaga);
}

export default homeSagas;
