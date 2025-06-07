import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
};
export const adminActions = createActions({
    getUserListRequest: (payload) => payload,
    getUserListSuccess: (payload) => payload,
    getUserListFailure: (payload) => payload,

    getSellerListRequest: (payload) => payload,
    getSellerListSuccess: (payload) => payload,
    getSellerListFailure: (payload) => payload,

    getGraphRequest: (payload) => payload,
    getGraphSuccess: (payload) => payload,
    getGraphFailure: (payload) => payload,

    disableUserRequest: (payload) => payload,
    disableUserSuccess: (payload) => payload,
    disableUserFailure: (payload) => payload,

    getReportRequest: (payload) => payload,
    getReportSuccess: (payload) => payload,
    getReportFailure: (payload) => payload,

    handleReportRequest: (payload) => payload,
    handleReportSuccess: (payload) => payload,
    handleReportFailure: (payload) => payload,

    createReportRequest: (payload) => payload,
    createReportSuccess: (payload) => payload,
    createReportFailure: (payload) => payload,

    createRefundRequest: (payload) => payload,
    createRefundSuccess: (payload) => payload,
    createRefundFailure: (payload) => payload,
});
