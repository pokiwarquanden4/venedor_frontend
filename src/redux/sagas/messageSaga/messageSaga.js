//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { jwtCheck } from '../jwtCheck';
import { messageActions } from '../../actions/message/messageActions';
import {
  getAllRoomChatAPI,
  getMessageByRoomChatAPI,
  createRoomChatAPI,
} from '../../../api/message/messageAPI';

function* createRoomChatSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const message = yield call(createRoomChatAPI, action.payload);
    yield put(messageActions.createRoomChatSuccess(message.data));

    jwtCheck(message);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(messageActions.createRoomChatFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getAllRoomChatSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const message = yield call(getAllRoomChatAPI, action.payload);
    yield put(messageActions.getAllRoomChatSuccess(message.data));

    jwtCheck(message);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(messageActions.getAllRoomChatFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* getMessageByRoomChatSaga(action) {
  try {
    yield put(loadingActions.setLoadingLoading(true));

    const message = yield call(getMessageByRoomChatAPI, action.payload);
    yield put(messageActions.getMessageByRoomChatSuccess(message.data));

    jwtCheck(message);
    yield put(loadingActions.setLoadingLoading(false));
  } catch (err) {
    yield put(messageActions.getMessageByRoomChatFailure(err.response.data));

    yield put(loadingActions.setLoadingLoading(false));
  }
}

function* messageSagas() {
  yield takeLatest(messageActions.getAllRoomChatRequest, getAllRoomChatSaga);
  yield takeLatest(messageActions.getMessageByRoomChatRequest, getMessageByRoomChatSaga);
  yield takeLatest(messageActions.createRoomChatRequest, createRoomChatSaga);
}

export default messageSagas;
