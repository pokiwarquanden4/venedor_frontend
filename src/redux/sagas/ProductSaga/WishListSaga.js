//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import { jwtCheck } from '../jwtCheck';
import { wishListActions } from '../../actions/product/wishListActions';
import {
  createWishListAPI,
  deleteAllWishListAPI,
  deleteWishListAPI,
  getWishListAPI,
} from '../../../api/userAPI/wishListAPI';
import { loginActions } from '../../actions/account/LoginActions';
import { loadingActions } from '../../actions/loading/LoadingActions';

function* getWishListSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(getWishListAPI, action.payload);
    yield put(wishListActions.getWishListSuccess(products.data));

    jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(wishListActions.getWishListFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* deleteWishListSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(deleteWishListAPI, action.payload);
    yield put(wishListActions.deleteWishListSuccess(products.data));
    yield put(loginActions.setLoginWishListRequest());

    jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(wishListActions.deleteWishListFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}
function* deleteAllWishListSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(deleteAllWishListAPI, action.payload);
    yield put(wishListActions.deleteAllWishListSuccess(products.data));
    yield put(loginActions.setLoginWishListRequest());

    jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(wishListActions.deleteAllWishListFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* createWishListSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const products = yield call(createWishListAPI, action.payload);
    yield put(wishListActions.createWishListSuccess(products.data));
    yield put(loginActions.setLoginWishListRequest());

    jwtCheck(products);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(wishListActions.createWishListFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* wishListSagas() {
  yield takeLatest(wishListActions.getWishListRequest, getWishListSaga);
  yield takeLatest(wishListActions.createWishListRequest, createWishListSaga);
  yield takeLatest(wishListActions.deleteWishListRequest, deleteWishListSaga);
  yield takeLatest(wishListActions.deleteAllWishListRequest, deleteAllWishListSaga);
}

export default wishListSagas;
