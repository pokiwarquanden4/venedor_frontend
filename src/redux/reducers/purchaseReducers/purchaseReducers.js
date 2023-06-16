import { getType, purchaseActions } from '../../actions/purchase/purchaseActions';
import { purchaseConstants } from '../../constants/purchaseConstants/purchaseConstants';

export default function purchaseReducers(state = purchaseConstants, action) {
  switch (action.type) {
    case getType(purchaseActions.purchaseRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(purchaseActions.purchaseSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(purchaseActions.purchaseFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
}
