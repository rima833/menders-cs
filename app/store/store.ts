import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import productsSlice from '../features/products/productsSlice';
import cartSlice from '../features/cart/cartSlice';
import vendorsSlice from '../features/vendors/vendorsSlice';
import ordersSlice from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    cart: cartSlice,
    vendors: vendorsSlice,
    orders: ordersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;