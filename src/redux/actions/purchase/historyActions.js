import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const historyActions = createActions({
  getHistoryRequest: (payload) => payload,
  getHistorySuccess: (payload) => payload,
  getHistoryFailure: (payload) => payload,

  orderRequest: (payload) => payload,
  orderSuccess: (payload) => payload,
  orderFailure: (payload) => payload,

  editOrderRequest: (payload) => payload,
  editOrderSuccess: (payload) => payload,
  editOrderFailure: (payload) => payload,

  cancelOrderRequest: (payload) => payload,
  cancelOrderSuccess: (payload) => payload,
  cancelOrderFailure: (payload) => payload,

  setCancelOder: (payload) => payload,
});
