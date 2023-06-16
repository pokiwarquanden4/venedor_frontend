import { getType, addressActions } from '../../actions/account/AddressActions';
import { addressConstants } from '../../constants/accountContants/addressConstants';

export default function addressReducers(state = addressConstants, action) {
  switch (action.type) {
    case getType(addressActions.createAddressRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(addressActions.createAddressSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(addressActions.createAddressFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(addressActions.getAddressRequest):
      return {
        ...state,
        addressList: undefined,
        loading: true,
      };
    case getType(addressActions.getAddressSuccess):
      return {
        ...state,
        addressList: action.payload.obj,
        success: false,
        loading: false,
      };
    case getType(addressActions.getAddressFailure):
      return {
        ...state,
        addressList: undefined,
        success: false,
        loading: false,
      };
    case getType(addressActions.editAddressRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(addressActions.editAddressSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(addressActions.editAddressFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(addressActions.deleteAddressRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(addressActions.deleteAddressSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(addressActions.deleteAddressFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
}
