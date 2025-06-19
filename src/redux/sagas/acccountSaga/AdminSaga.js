//Sau khi thực hiện action thì action đó sẽ nhảy vào trong saga (middleware)
//Khi call 1 API có thể mất nhiều thời gian do nhiều nguyên nhân khiến người dùng call liên tục, takeLatest sẽ nhận lần call cuối cùng
//put sẽ chọc vào trong file reducers/post để thực hiện lệnh
import { takeLatest, call, put } from 'redux-saga/effects';
import { notificationActions } from '../../actions/notification/notificationAction';
import { loadingActions } from '../../actions/loading/LoadingActions';
import { jwtCheck } from '../jwtCheck';
import { adminActions } from '../../actions/account/AdminActions';
import { addPolicyAPI, createRefundAPI, createReportAPI, deletePolicyAPI, disableUserAPI, editPolicyAPI, getAllPolicyAPI, getGraphAPI, getRefundAPI, getReportedAPI, getSellerListAPI, getUserListAPI, handleRefundAPI, handleReportAPI } from '../../../api/userAPI/AdminAPI';

function* getUserListSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(getUserListAPI, action.payload);
        yield put(adminActions.getUserListSuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.getUserListFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* getSellerListSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(getSellerListAPI, action.payload);
        yield put(adminActions.getSellerListSuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.getSellerListFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* disableUserSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(disableUserAPI, action.payload);
        yield put(adminActions.disableUserSuccess(action.payload));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.disableUserFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* createReportSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(createReportAPI, action.payload);
        yield put(adminActions.createReportSuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.createReportFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* getReportSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(getReportedAPI, action.payload);
        yield put(adminActions.getReportSuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.getReportFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* getRefundSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(getRefundAPI, action.payload);
        yield put(adminActions.getRefundSuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.getRefundFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* getGraphSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(getGraphAPI, action.payload);
        yield put(adminActions.getGraphSuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.getGraphFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* createRefundSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(createRefundAPI, action.payload);
        yield put(adminActions.createRefundSuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.createRefundFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* handleReportSaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(handleReportAPI, action.payload);
        yield put(adminActions.handleReportSuccess(action.payload));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.handleReportFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* handleRefundSaga(action) {
    try {

        const data = yield call(handleRefundAPI, action.payload);
        yield put(adminActions.handleRefundSuccess(action.payload));

        yield jwtCheck(data);
    } catch (err) {
        yield put(adminActions.handleRefundFailure(err.response.data));
    }
}

function* getAllPolicySaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(getAllPolicyAPI, action.payload);
        yield put(adminActions.getAllPolicySuccess(data.data));

        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.getAllPolicyFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* addPolicySaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(addPolicyAPI, action.payload);
        yield put(adminActions.addPolictySuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.addPolictyFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* editPolicySaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(editPolicyAPI, action.payload);
        yield put(adminActions.editPolicySuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.editPolicyFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* deletePolicySaga(action) {
    try {
        yield put(loadingActions.setLoadingLoading(true));

        const data = yield call(deletePolicyAPI, action.payload);
        yield put(adminActions.deletePolicySuccess(data.data));

        yield jwtCheck(data);
        yield put(loadingActions.setLoadingLoading(false));
    } catch (err) {
        yield put(adminActions.deletePolicyFailure(err.response.data));
        yield put(loadingActions.setLoadingLoading(false));
    }
}

function* adminSagas() {
    yield takeLatest(adminActions.getUserListRequest, getUserListSaga);
    yield takeLatest(adminActions.getSellerListRequest, getSellerListSaga);
    yield takeLatest(adminActions.getGraphRequest, getGraphSaga);
    yield takeLatest(adminActions.disableUserRequest, disableUserSaga);
    yield takeLatest(adminActions.createReportRequest, createReportSaga);
    yield takeLatest(adminActions.getReportRequest, getReportSaga);
    yield takeLatest(adminActions.getRefundRequest, getRefundSaga);
    yield takeLatest(adminActions.handleReportRequest, handleReportSaga);
    yield takeLatest(adminActions.handleRefundRequest, handleRefundSaga);
    yield takeLatest(adminActions.createRefundRequest, createRefundSaga);
    yield takeLatest(adminActions.getAllPolicyRequest, getAllPolicySaga);
    yield takeLatest(adminActions.addPolictyRequest, addPolicySaga);
    yield takeLatest(adminActions.editPolicyRequest, editPolicySaga);
    yield takeLatest(adminActions.deletePolicyRequest, deletePolicySaga);
}

export default adminSagas;
