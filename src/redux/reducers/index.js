import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducers from './accountReducers/LoginReducers';
import rootSaga from '../sagas';
import createAccountReducers from './accountReducers/CreateAccountReducers';
import ProductReducers from './ProductReducers/ProductReducers';
import loadingReducers from './loadingReuders/LoadingReducers';
import notificationReducers from './notificationReducers/notificationReducers';
import ProductSearchReducers from './ProductReducers/ProductSearchReducers';
import addressReducers from './accountReducers/AddressReducers';
import wishListReducers from './ProductReducers/WishListReducers';
import cartReducers from './ProductReducers/cartReducers';
import purchaseReducers from './purchaseReducers/purchaseReducers';
import historyReducers from './purchaseReducers/historyReducers';
import homeReducers from './ProductReducers/homeReducers';
import messageReducers from './messageReducers/messageReducers';
import staffReducers from './accountReducers/StaffReducers';

const rootReducer = combineReducers({
  loginReducers,
  createAccountReducers,
  ProductReducers,
  loadingReducers,
  notificationReducers,
  ProductSearchReducers,
  addressReducers,
  wishListReducers,
  cartReducers,
  purchaseReducers,
  historyReducers,
  homeReducers,
  messageReducers,
  staffReducers,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'messageReducers',
    'loadingReducers',
    'createAccountReducers',
    'notificationReducers',
    'ProductSearchReducers',
    'addressReducers',
    'wishListReducers',
    'cartReducers',
    'purchaseReducers',
    'historyReducers',
    'homeReducers',
    'staffReducers'
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { persistor, store };
