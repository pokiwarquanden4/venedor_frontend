import { all } from 'redux-saga/effects';
import loginSagas from './acccountSaga/LoginSaga';
import createAccountSagas from './acccountSaga/CreateAccountSaga';
import productSagas from './ProductSaga/ProductSaga';
import addressSagas from './acccountSaga/AddressSaga';
import wishListSagas from './ProductSaga/WishListSaga';
import loadingSaga from './loadingSaga/loadingSaga';
import notificationSaga from './notificationSaga/notificationSaga';
import purchaseSagas from './purchaseSaga/purchaseSaga';
import historySagas from './historySaga/historySaga';
import homeSagas from './ProductSaga/HomeSaga';
import messageSagas from './messageSaga/messageSaga';

export default function* rootSaga() {
  yield all([
    loginSagas(),
    createAccountSagas(),
    productSagas(),
    addressSagas(),
    wishListSagas(),
    loadingSaga(),
    notificationSaga(),
    purchaseSagas(),
    historySagas(),
    homeSagas(),
    messageSagas(),
  ]);
}
