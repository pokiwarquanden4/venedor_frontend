import { createActions as createCartActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const purchaseActions = createCartActions({
  purchaseRequest: (payload) => payload,
  purchaseSuccess: (payload) => payload,
  purchaseFailure: (payload) => payload,
});
