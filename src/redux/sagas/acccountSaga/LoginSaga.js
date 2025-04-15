//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import { loginActions } from '../../actions/account/LoginActions';
import { createOtpAPI, getPasswordAPI, getUserDataAPI, loginAPI, wishListAPI } from '../../../api/userAPI/UserAPI';
import { jwtCheck, removeJWT } from '../jwtCheck';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { notificationActions } from '../../actions/notification/notificationAction';

function* loginSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const user = yield call(loginAPI, action.payload);
    yield put(loginActions.loginSuccess(user.data));

    yield jwtCheck(user);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Login Successfully'));
  } catch (err) {
    yield put(loginActions.loginFailure());
    yield put(loginActions.loginError(true));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* logoutSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    yield put(loginActions.logoutSuccess());

    yield removeJWT();
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Logout Successfully'));
  } catch (err) {
    yield put(loginActions.logoutFailure());
    yield put(loginActions.logoutError(true));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* setWishListSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const wishList = yield call(wishListAPI, action.payload);
    yield put(loginActions.setLoginWishListSuccess(wishList.data));

    yield jwtCheck(wishList);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(loginActions.setLoginWishListFailure());
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* createOtpSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const Otp = yield call(createOtpAPI, action.payload);
    yield put(loginActions.createOtpSuccess(Otp.data));

    yield jwtCheck(Otp);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Success, Check Your Gmail'));
  } catch (err) {
    yield put(loginActions.createOtpFailure());
    yield put(loadingActions.setLoadingLoading(false));

    yield put(notificationActions.setNotificationContent('Failed'));
  }
}

function* getPasswordSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const Otp = yield call(getPasswordAPI, action.payload);
    yield put(loginActions.getPasswordSuccess(Otp.data));

    yield jwtCheck(Otp);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Success, Check Your Gmail'));
  } catch (err) {
    yield put(loginActions.getPasswordFailure());
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Failed'));
  }
}

function* getUserDataSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const data = yield call(getUserDataAPI, action.payload);
    yield put(loginActions.getUserDataSuccess(data.data));

    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(loginActions.getUserDataFailure());
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* loginSagas() {
  yield takeLatest(loginActions.loginRequest, loginSaga);
  yield takeLatest(loginActions.logoutRequest, logoutSaga);
  yield takeLatest(loginActions.setLoginWishListRequest, setWishListSaga);
  yield takeLatest(loginActions.createOtpRequest, createOtpSaga);
  yield takeLatest(loginActions.getPasswordRequest, getPasswordSaga);
  yield takeLatest(loginActions.getUserDataRequest, getUserDataSaga);
}

export default loginSagas;
