import { getType, loginActions } from '../../actions/account/LoginActions';
import { LoginConstant } from '../../constants/accountContants/LoginConstant';

export default function loginReducers(state = LoginConstant, action) {
  switch (action.type) {
    case getType(loginActions.loginRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(loginActions.loginSuccess):
      const returnValue = {
        ...state,
        login: true,
        loading: false,
        loginPopup: false,
        loginError: false,
        loginRole: action.payload.obj.roleId,
      };
      if (action.payload.obj.WishLists) {
        returnValue.wishList = action.payload.obj.WishLists;
      }
      return returnValue;
    case getType(loginActions.loginFailure):
      return {
        ...state,
        login: false,
        loading: false,
      };
    case getType(loginActions.logoutRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(loginActions.logoutSuccess):
      return {
        ...state,
        login: false,
        loading: false,
      };
    case getType(loginActions.logoutFailure):
      return {
        ...state,
        login: false,
        loading: false,
      };
    case getType(loginActions.loginPopup):
      return {
        ...state,
        loginPopup: action.payload,
        loginError: false,
      };
    case getType(loginActions.loginStatus):
      const returnValue1 = {
        ...state,
        login: action.payload,
      };
      if (!action.payload) {
        returnValue1.loginRole = false;
      }
      return returnValue1;
    case getType(loginActions.loginError):
      return {
        ...state,
        loginError: action.payload,
      };

    case getType(loginActions.setLoginWishListRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(loginActions.setLoginWishListSuccess):
      return {
        ...state,
        loading: false,
        wishList: action.payload.obj,
      };
    case getType(loginActions.setLoginWishListFailure):
      return {
        ...state,
        loading: false,
      };
    case getType(loginActions.createOtpRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(loginActions.createOtpSuccess):
      return {
        ...state,
        loading: false,
      };
    case getType(loginActions.createOtpFailure):
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    case getType(loginActions.getPasswordRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(loginActions.getPasswordSuccess):
      return {
        ...state,
        loading: false,
      };
    case getType(loginActions.getPasswordFailure):
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    default:
      return state;
  }
}
