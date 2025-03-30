import { getType, homeActions } from '../../actions/product/homeActions';
import { homeConstants } from '../../constants/ProductContants/homeConstants';

export default function homeReducers(state = homeConstants, action) {
  switch (action.type) {
    case getType(homeActions.dailyDealsProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(homeActions.dailyDealsProductSuccess):
      return {
        ...state,
        success: true,
        dailyDeals: action.payload.obj,
        loading: false,
      };
    case getType(homeActions.dailyDealsProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(homeActions.latestProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(homeActions.latestProductSuccess):
      var results = action.payload.obj.map(item => {
        return {
          ...item,
          listImgURL: item.listImgURL.split('___')
        }
      })
      return {
        ...state,
        success: true,
        latestProducts: results,
        loading: false,
      };
    case getType(homeActions.latestProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(homeActions.bestSellerProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(homeActions.bestSellerProductSuccess):
      var results = action.payload.obj.map(item => {
        return {
          ...item,
          listImgURL: item.listImgURL.split('___')
        }
      })
      return {
        ...state,
        success: true,
        bestSellerProducts: results,
        loading: false,
      };
    case getType(homeActions.bestSellerProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(homeActions.featureProductRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(homeActions.featureProductSuccess):
      var results = action.payload.obj.map(item => {
        return {
          ...item,
          listImgURL: item.listImgURL.split('___')
        }
      })
      return {
        ...state,
        success: true,
        featureProducts: results,
        loading: false,
      };
    case getType(homeActions.featureProductFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
}
