// client/src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import shipmentReducer from './shipmentSlice';

export const store = configureStore({
  reducer: {
    shipment: shipmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;