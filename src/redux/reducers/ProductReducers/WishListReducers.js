import { getType, wishListActions } from '../../actions/product/wishListActions.js';
import { wishListConstants } from '../../constants/ProductContants/WishListConstants';

export default function wishListReducers(state = wishListConstants, action) {
  switch (action.type) {
    case getType(wishListActions.getWishListRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(wishListActions.getWishListSuccess):
      return {
        ...state,
        loading: false,
        wishList: action.payload.obj,
      };
    case getType(wishListActions.getWishListFailure):
      return {
        ...state,
        loading: false,
      };
    case getType(wishListActions.createWishListRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(wishListActions.createWishListSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(wishListActions.createWishListFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(wishListActions.deleteWishListRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(wishListActions.deleteWishListSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(wishListActions.deleteWishListFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(wishListActions.deleteAllWishListRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(wishListActions.deleteAllWishListSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(wishListActions.deleteAllWishListFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(wishListActions.setWishListSuccess):
      return {
        ...state,
        success: action.payload,
      };

    default:
      return state;
  }
}
