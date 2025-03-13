import { getType, productActions } from '../../actions/product/ProductActions';
import { productConstants } from '../../constants/ProductContants/ProductConstants';

export default function ProductReducers(state = productConstants, action) {
  switch (action.type) {
    case getType(productActions.createProductRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(productActions.createProductSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(productActions.createProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(productActions.getCommentRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(productActions.getCommentSuccess):
      return {
        ...state,
        success: true,
        loading: false,
        productComments: action.payload.obj
      };
    case getType(productActions.getCommentFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(productActions.getCategoryRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(productActions.getCategorySuccess):
      return {
        ...state,
        success: true,
        loading: false,
        category: action.payload.obj
      };
    case getType(productActions.getCategoryFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(productActions.setProductSuccess):
      return {
        ...state,
        success: false,
      };
    case getType(productActions.getAllProductRequest):
      return {
        ...state,
        getAllProduct: false,
        loading: true,
      };
    case getType(productActions.getAllProductSuccess):
      return {
        ...state,
        getAllProduct: action.payload.obj,
        loading: false,
      };
    case getType(productActions.getAllProductFailure):
      return {
        ...state,
        getAllProduct: false,
        loading: false,
      };
    case getType(productActions.editProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(productActions.editProductSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(productActions.editProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };

    default:
      return state;
  }
}
