import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/accountSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedAccountReducer = persistReducer(persistConfig,accountReducer);
const store = configureStore({
  reducer:{
    account:persistedAccountReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

const persistor = persistStore(store);
export default store;
export {persistor};