import { cartActions, getType } from '../../actions/product/cartActions';
import { cartConstants } from '../../constants/cartConstant/cartConstant';

export default function cartReducers(state = cartConstants, action) {
  switch (action.type) {
    case getType(cartActions.getCartProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(cartActions.getCartProductSuccess):
      return {
        ...state,
        success: true,
        cartProducts: action.payload.obj,
        loading: false,
      };
    case getType(cartActions.getCartProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(cartActions.deleteCartProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(cartActions.deleteCartProductSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(cartActions.deleteCartProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(cartActions.createCartProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(cartActions.createCartProductSuccess):
      return {
        ...state,
        success: true,
        showing: true,
        loading: false,
      };
    case getType(cartActions.createCartProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(cartActions.editCartProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(cartActions.editCartProductSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(cartActions.editCartProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(cartActions.setCartShowing):
      return {
        ...state,
        showing: action.payload,
      };
    default:
      return state;
  }
}
