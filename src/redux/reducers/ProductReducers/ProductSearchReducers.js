import { getType, productSearchActions } from '../../actions/product/ProductSearchAction';
import { productSearchConstants } from '../../constants/ProductContants/productSearchConstants';

export default function ProductSearchReducers(state = productSearchConstants, action) {
  switch (action.type) {
    case getType(productSearchActions.searchProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(productSearchActions.searchProductSuccess):
      var results = action.payload.obj.map(item => {
        return {
          ...item,
          listImgURL: item.listImgURL.split('___')
        }
      })
      return {
        ...state,
        success: true,
        searchProducts: results,
        loading: false,
      };
    case getType(productSearchActions.searchProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(productSearchActions.quickSearchProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
        quickSearchLoading: true,
      };
    case getType(productSearchActions.quickSearchProductSuccess):
      return {
        ...state,
        success: true,
        quickSearchProduct: action.payload.obj,
        loading: false,
        quickSearchLoading: false,
      };
    case getType(productSearchActions.quickSearchProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
        quickSearchLoading: false,
      };
    case getType(productSearchActions.searchProductByIdRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(productSearchActions.searchProductByIdSuccess):
      return {
        ...state,
        success: true,
        searchProductById: action.payload.obj,
        loading: false,
      };
    case getType(productSearchActions.searchProductByIdFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(productSearchActions.searchCategoryProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(productSearchActions.searchCategoryProductSuccess):
      var results = {
        totalPages: action.payload.obj.totalPages,
        products: action.payload.obj.products.map(product => {
          return {
            ...product,
            listImgURL: product.listImgURL.split('___')
          }
        })
      }
      return {
        ...state,
        success: true,
        categorySearchProduct: results,
        loading: false,
      };
    case getType(productSearchActions.searchCategoryProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
}
