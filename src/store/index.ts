import { configureStore } from '@reduxjs/toolkit';
import { accountReducer } from './account/slice';
import { transactionReducer } from './transaction/slice';
import { userSlice } from './user/slice';

export const store = configureStore({
  reducer: {
    account: accountReducer.reducer,
    transaction: transactionReducer.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});