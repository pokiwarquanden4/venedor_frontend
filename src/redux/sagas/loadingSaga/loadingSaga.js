import { takeLatest } from 'redux-saga/effects';
import { loadingActions } from '../../actions/loading/LoadingActions';

function* handleLoading() {}

function* loadingSaga() {
  yield takeLatest(loadingActions.setLoadingLoading, handleLoading);
}

export default loadingSaga;
