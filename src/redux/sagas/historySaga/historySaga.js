//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import { notificationActions } from '../../actions/notification/notificationAction';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { jwtCheck } from '../jwtCheck';
import { historyActions } from '../../actions/purchase/historyActions';
import { cancelOderAPI, editOderAPI, historyAPI, oderAPI } from '../../../api/history/historyAPI';

function* historySaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const product = yield call(historyAPI, action.payload);
    yield put(historyActions.getHistorySuccess(product.data));

    jwtCheck(product);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(historyActions.getHistoryFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* orderSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const order = yield call(oderAPI, action.payload);
    yield put(historyActions.orderSuccess(order.data));

    jwtCheck(order);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(historyActions.orderFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* editOrderSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const order = yield call(editOderAPI, action.payload);
    yield put(historyActions.editOrderSuccess(order.data));

    jwtCheck(order);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(historyActions.editOrderFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* cancelOrderSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const order = yield call(cancelOderAPI, action.payload);
    yield put(historyActions.cancelOrderSuccess(order.data));

    jwtCheck(order);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Delete Successfully'));
  } catch (err) {
    yield put(historyActions.cancelOrderFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* historySagas() {
  yield takeLatest(historyActions.getHistoryRequest, historySaga);
  yield takeLatest(historyActions.orderRequest, orderSaga);
  yield takeLatest(historyActions.editOrderRequest, editOrderSaga);
  yield takeLatest(historyActions.cancelOrderRequest, cancelOrderSaga);
}

export default historySagas;
