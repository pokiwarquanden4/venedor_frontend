import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const wishListActions = createActions({
  getWishListRequest: (payload) => payload,
  getWishListSuccess: (payload) => payload,
  getWishListFailure: (payload) => payload,

  createWishListRequest: (payload) => payload,
  createWishListSuccess: (payload) => payload,
  createWishListFailure: (payload) => payload,

  deleteWishListRequest: (payload) => payload,
  deleteWishListSuccess: (payload) => payload,
  deleteWishListFailure: (payload) => payload,

  deleteAllWishListRequest: (payload) => payload,
  deleteAllWishListSuccess: (payload) => payload,
  deleteAllWishListFailure: (payload) => payload,

  setWishListSuccess: (payload) => payload,
});
