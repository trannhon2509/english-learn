import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import learningReducer from './learningSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    learning: learningReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: import.meta.env.DEV,
});
