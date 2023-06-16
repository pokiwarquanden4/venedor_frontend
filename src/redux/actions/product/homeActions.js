import { createActions as createCartActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const homeActions = createCartActions({
  dailyDealsProductRequest: (payload) => payload,
  dailyDealsProductSuccess: (payload) => payload,
  dailyDealsProductFailure: (payload) => payload,

  latestProductRequest: (payload) => payload,
  latestProductSuccess: (payload) => payload,
  latestProductFailure: (payload) => payload,

  bestSellerProductRequest: (payload) => payload,
  bestSellerProductSuccess: (payload) => payload,
  bestSellerProductFailure: (payload) => payload,

  featureProductRequest: (payload) => payload,
  featureProductSuccess: (payload) => payload,
  featureProductFailure: (payload) => payload,
});
