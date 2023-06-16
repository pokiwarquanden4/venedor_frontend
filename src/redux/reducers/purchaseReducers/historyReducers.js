import { getType, historyActions } from '../../actions/purchase/historyActions';
import { historyConstants } from '../../constants/purchaseConstants/historyConstants';

export default function historyReducers(state = historyConstants, action) {
  switch (action.type) {
    case getType(historyActions.getHistoryRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(historyActions.getHistorySuccess):
      return {
        ...state,
        success: true,
        loading: false,
        historyList: action.payload.obj,
      };
    case getType(historyActions.getHistoryFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(historyActions.orderRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(historyActions.orderSuccess):
      return {
        ...state,
        success: true,
        loading: false,
        orderList: action.payload.obj,
      };
    case getType(historyActions.orderFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(historyActions.editOrderRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(historyActions.editOrderSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(historyActions.editOrderFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(historyActions.cancelOrderRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(historyActions.cancelOrderSuccess):
      return {
        ...state,
        success: true,
        loading: false,
        cancelOder: true,
      };
    case getType(historyActions.cancelOrderFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(historyActions.setCancelOder):
      return {
        ...state,
        cancelOder: action.payload,
      };
    default:
      return state;
  }
}
