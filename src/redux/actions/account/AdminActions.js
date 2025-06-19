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

    getRefundRequest: (payload) => payload,
    getRefundSuccess: (payload) => payload,
    getRefundFailure: (payload) => payload,

    handleReportRequest: (payload) => payload,
    handleReportSuccess: (payload) => payload,
    handleReportFailure: (payload) => payload,

    handleRefundRequest: (payload) => payload,
    handleRefundSuccess: (payload) => payload,
    handleRefundFailure: (payload) => payload,

    createReportRequest: (payload) => payload,
    createReportSuccess: (payload) => payload,
    createReportFailure: (payload) => payload,

    createRefundRequest: (payload) => payload,
    createRefundSuccess: (payload) => payload,
    createRefundFailure: (payload) => payload,

    getAllPolicyRequest: (payload) => payload,
    getAllPolicySuccess: (payload) => payload,
    getAllPolicyFailure: (payload) => payload,

    addPolictyRequest: (payload) => payload,
    addPolictySuccess: (payload) => payload,
    addPolictyFailure: (payload) => payload,

    editPolicyRequest: (payload) => payload,
    editPolicySuccess: (payload) => payload,
    editPolicyFailure: (payload) => payload,

    deletePolicyRequest: (payload) => payload,
    deletePolicySuccess: (payload) => payload,
    deletePolicyFailure: (payload) => payload,
});
