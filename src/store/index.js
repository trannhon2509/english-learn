import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@store/userSlice';
import learningReducer from '@store/learningSlice';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import EncryptTransform from './encryptTransform';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['user', 'learning'],
  transforms: [EncryptTransform],
};

const rootReducer = {
  user: userReducer,
  learning: learningReducer,
};

const persistedReducer = persistReducer(persistConfig, (state = {}, action) => {
  return Object.keys(rootReducer).reduce((acc, key) => {
    acc[key] = rootReducer[key](state[key], action);
    return acc;
  }, {});
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);
