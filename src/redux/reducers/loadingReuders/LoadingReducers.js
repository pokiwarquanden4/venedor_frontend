import { getType, loadingActions } from '../../actions/loading/LoadingActions';
import { loadingConstants } from '../../constants/loadingContants/LoadingConstants';

export default function loadingReducers(state = loadingConstants, action) {
  switch (action.type) {
    case getType(loadingActions.setLoadingLoading):
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
