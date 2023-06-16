import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const loginActions = createActions({
  loginRequest: (payload) => payload,
  loginSuccess: (payload) => payload,
  loginFailure: (payload) => payload,

  logoutRequest: (payload) => payload,
  logoutSuccess: (payload) => payload,
  logoutFailure: (payload) => payload,

  createOtpRequest: (payload) => payload,
  createOtpSuccess: (payload) => payload,
  createOtpFailure: (payload) => payload,

  getPasswordRequest: (payload) => payload,
  getPasswordSuccess: (payload) => payload,
  getPasswordFailure: (payload) => payload,

  loginPopup: (payload) => payload,

  loginStatus: (payload) => payload,

  loginError: (payload) => payload,

  setLoginWishListRequest: (payload) => payload,
  setLoginWishListSuccess: (payload) => payload,
  setLoginWishListFailure: (payload) => payload,
});
