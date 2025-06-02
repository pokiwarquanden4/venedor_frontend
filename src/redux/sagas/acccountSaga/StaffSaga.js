//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import { notificationActions } from '../../actions/notification/notificationAction';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { jwtCheck } from '../jwtCheck';
import { createStaffAPI, deleteStaffAPI, editStaffAPI, getAllStaffAPI } from '../../../api/staff/staffAPI';
import { staffActions } from '../../actions/account/StaffActions';

function* createStaffSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const staff = yield call(createStaffAPI, action.payload);
    yield put(staffActions.createStaffSuccess(staff.data));

    yield jwtCheck(staff);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Create Successfully'));
  } catch (err) {
    yield put(staffActions.createStaffFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* editStaffSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const staff = yield call(editStaffAPI, action.payload);
    yield put(staffActions.editStaffSuccess(staff.data));

    yield jwtCheck(staff);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Edit Successfully'));
  } catch (err) {
    yield put(staffActions.editStaffFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* deleteStaffSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const staff = yield call(deleteStaffAPI, action.payload);
    yield put(staffActions.deleteStaffSuccess(staff.data));

    yield jwtCheck(staff);
    yield put(loadingActions.setLoadingLoading(false));
    yield put(notificationActions.setNotificationContent('Delete Successfully'));
  } catch (err) {
    yield put(staffActions.deleteStaffFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getAllStaffSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const staff = yield call(getAllStaffAPI, action.payload);
    yield put(staffActions.getStaffSuccess(staff.data));

    yield jwtCheck(staff);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(staffActions.getStaffFailure(err.response.data));
    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* staffSagas() {
  yield takeLatest(staffActions.createStaffRequest, createStaffSaga);
  yield takeLatest(staffActions.editStaffRequest, editStaffSaga);
  yield takeLatest(staffActions.deleteStaffRequest, deleteStaffSaga);
  yield takeLatest(staffActions.getStaffRequest, getAllStaffSaga);
}

export default staffSagas;
