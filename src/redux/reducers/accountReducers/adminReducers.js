import { getType } from '../../actions/account/AddressActions';
import { adminActions } from '../../actions/account/AdminActions';
import { adminConstants } from '../../constants/accountContants/adminConstants';

export default function adminReducers(state = adminConstants, action) {
    switch (action.type) {
        case getType(adminActions.getUserListRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.getUserListSuccess):
            return {
                ...state,
                success: true,
                userList: action.payload.obj,
                loading: false,
            };
        case getType(adminActions.getUserListFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };
        case getType(adminActions.getSellerListRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.getSellerListSuccess):
            return {
                ...state,
                success: true,
                sellerList: action.payload.obj,
                loading: false,
            };
        case getType(adminActions.getSellerListFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };
        case getType(adminActions.getGraphRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.getGraphSuccess):
            return {
                ...state,
                success: true,
                graph: action.payload.obj,
                loading: false,
            };
        case getType(adminActions.getGraphFailure):
            return {
                ...state,
                success: false,
                graph: [],
                loading: false,
            };
        case getType(adminActions.disableUserRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.disableUserSuccess): {
            const { userId, disable } = action.payload;

            // Cập nhật userList
            const updatedUserList = state.userList.users.map(user =>
                user.id === userId ? { ...user, disable } : user
            )

            // Cập nhật sellerList
            const updatedSellerList = state.sellerList.sellers.map(seller =>
                seller.id === userId ? { ...seller, disable } : seller
            )

            return {
                ...state,
                userList: {
                    users: updatedUserList,
                    totalPages: state.userList.totalPages
                },
                sellerList: {
                    sellers: updatedSellerList,
                    totalPages: state.sellerList.totalPages
                },
                success: true,
                loading: false,
            };
        }
        case getType(adminActions.disableUserFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };
        case getType(adminActions.createReportRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.createReportSuccess):
            return {
                ...state,
                success: true,
                loading: false,
            };
        case getType(adminActions.createReportFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };
        case getType(adminActions.getReportRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.getReportSuccess):
            return {
                ...state,
                success: true,
                reported: action.payload.obj,
                loading: false,
            };
        case getType(adminActions.getReportFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };
        case getType(adminActions.getRefundRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.getRefundSuccess):
            return {
                ...state,
                success: true,
                refund: action.payload.obj,
                loading: false,
            };
        case getType(adminActions.getRefundFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };
        case getType(adminActions.handleReportRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.handleReportSuccess): {
            const { reportId } = action.payload;

            const updatedReports = state.reported && state.reported.reports
                ? state.reported.reports.filter(report => report.id !== reportId)
                : [];

            return {
                ...state,
                success: true,
                reported: {
                    ...state.reported,
                    reports: updatedReports,
                    totalPages: state.reported.totalPages // giữ nguyên số trang, hoặc cập nhật lại nếu cần
                },
                loading: false,
            };
        }
        case getType(adminActions.handleReportFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };

        case getType(adminActions.handleRefundRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.handleRefundSuccess): {
            const { refundId } = action.payload;

            const updatedRefund = state.refund && state.refund.refunds
                ? state.refund.refunds.filter(refund => refund.id !== refundId)
                : [];

            return {
                ...state,
                success: true,
                refund: {
                    ...state.refund,
                    refunds: updatedRefund,
                    totalPages: state.refund.totalPages // giữ nguyên số trang, hoặc cập nhật lại nếu cần
                },
                loading: false,
            };
        }
        case getType(adminActions.handleRefundFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };
        case getType(adminActions.createRefundRequest):
            return {
                ...state,
                success: false,
                loading: true,
            };
        case getType(adminActions.createRefundSuccess):
            return {
                ...state,
                success: true,
                loading: false,
            };
        case getType(adminActions.createRefundFailure):
            return {
                ...state,
                success: false,
                loading: false,
            };
        default:
            return state;
    }
}
