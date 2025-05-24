//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  createUserAPI,
  editAccountAPI,
  sendCreateAccountOTPAPI,
  updatePasswordAPI,
} from '../../../api/userAPI/UserAPI';
import { createAccountActions } from '../../actions/account/CreateAccountActions';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { notificationActions } from '../../actions/notification/notificationAction';

function* createAccountSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const user = yield call(createUserAPI, action.payload);
    yield put(createAccountActions.createAccountSuccess(user.data));

    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Create Successfully'));
  } catch (err) {
    yield put(createAccountActions.createAccountFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* editAccountSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const user = yield call(editAccountAPI, action.payload);
    yield put(createAccountActions.editAccountSuccess(user.data));

    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Edit Successfully'));
  } catch (err) {
    yield put(createAccountActions.editAccountFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* updatePasswordSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const user = yield call(updatePasswordAPI, action.payload);
    yield put(createAccountActions.updatePasswordSuccess(user.data));

    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Update Successfully'));
  } catch (err) {
    yield put(createAccountActions.updatePasswordFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* sendCreateAccountOTPSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const Otp = yield call(sendCreateAccountOTPAPI, action.payload);
    yield put(createAccountActions.sendCreateAccountOTPSuccess(Otp.data));

    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Success, Check Your Gmail'));
  } catch (err) {
    yield put(createAccountActions.sendCreateAccountOTPFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Failed'));
  }
}

function* createAccountSagas() {
  yield takeLatest(createAccountActions.createAccountRequest, createAccountSaga);
  yield takeLatest(createAccountActions.editAccountRequest, editAccountSaga);
  yield takeLatest(createAccountActions.updatePasswordRequest, updatePasswordSaga);
  yield takeLatest(createAccountActions.sendCreateAccountOTPRequest, sendCreateAccountOTPSaga);
}

export default createAccountSagas;
