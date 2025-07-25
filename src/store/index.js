import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@store/userSlice';
import learningReducer from '@store/learningSlice';

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
