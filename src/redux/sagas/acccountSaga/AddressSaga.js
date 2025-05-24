//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import { addressActions } from '../../actions/account/AddressActions';
import {
  createAddressAPI,
  deleteAddressAPI,
  editAddressAPI,
  getAddressAPI,
} from '../../../api/userAPI/AddressAPI';
import { notificationActions } from '../../actions/notification/notificationAction';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { jwtCheck } from '../jwtCheck';

function* createAddressSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const address = yield call(createAddressAPI, action.payload);
    yield put(addressActions.createAddressSuccess(address.data));

    yield jwtCheck(address);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Create Successfully'));
  } catch (err) {
    yield put(addressActions.createAddressFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* editAddressSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const address = yield call(editAddressAPI, action.payload);
    yield put(addressActions.editAddressSuccess(address.data));

    yield jwtCheck(address);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Edit Successfully'));
  } catch (err) {
    yield put(addressActions.editAddressFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getAddressSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const address = yield call(getAddressAPI, action.payload);
    yield put(addressActions.getAddressSuccess(address.data));

    yield jwtCheck(address);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(addressActions.getAddressFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* deleteAddressSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const address = yield call(deleteAddressAPI, action.payload);
    yield put(addressActions.deleteAddressSuccess(address.data));

    yield jwtCheck(address);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Delete Successfully'));
  } catch (err) {
    yield put(addressActions.deleteAddressFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* addressSagas() {
  yield takeLatest(addressActions.createAddressRequest, createAddressSaga);
  yield takeLatest(addressActions.editAddressRequest, editAddressSaga);
  yield takeLatest(addressActions.getAddressRequest, getAddressSaga);
  yield takeLatest(addressActions.deleteAddressRequest, deleteAddressSaga);
}

export default addressSagas;
