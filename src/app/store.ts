import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import AsyncFetch from './features/ProductsSlice';
import AuthSlice from './features/AuthSlice';

export const store = configureStore({
  reducer: {
    products: AsyncFetch,
    auth: AuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; // type the State type https://redux-toolkit.js.org/usage/usage-with-typescript
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
