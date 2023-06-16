//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import { notificationActions } from '../../actions/notification/notificationAction';
import { purchaseActions } from '../../actions/purchase/purchaseActions';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { jwtCheck } from '../jwtCheck';
import { purchaseAPI } from '../../../api/purchase/purchaseAPI';

function* purchaseSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(purchaseAPI, action.payload);
    yield put(purchaseActions.purchaseSuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Purchase Successfully'));
  } catch (err) {
    yield put(purchaseActions.purchaseFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* purchaseSagas() {
  yield takeLatest(purchaseActions.purchaseRequest, purchaseSaga);
}

export default purchaseSagas;
