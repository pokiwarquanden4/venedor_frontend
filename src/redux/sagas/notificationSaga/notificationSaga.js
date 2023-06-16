import { takeLatest, put } from 'redux-saga/effects';
import { notificationActions } from '../../actions/notification/notificationAction';

function* showingSaga(payload) {
  if (payload.payload === '') {
    yield put(notificationActions.setNotificationShowing(false));
  } else {
    yield put(notificationActions.setNotificationShowing(true));
  }
}
function* notificationSaga() {
  yield takeLatest(notificationActions.setNotificationContent, showingSaga);
}

export default notificationSaga;
