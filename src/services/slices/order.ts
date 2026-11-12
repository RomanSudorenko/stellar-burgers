import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TOrder } from '@utils-types';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderData: TOrder | null;
  orderError: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  orderData: null,
  orderError: null,
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    const [order] = response.orders;
    if (!order) {
      throw new Error('Заказ не найден');
    }
    return order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderError = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderError = action.error.message ?? 'Заказ не найден';
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrderRequest = (state: RootState): boolean =>
  state.order.orderRequest;

export const selectOrderModalData = (state: RootState): TOrder | null =>
  state.order.orderModalData;

export const selectOrderByNumber =
  (orderNumber: number) =>
  (state: RootState): TOrder | null =>
    state.feed.orders.find((order) => order.number === orderNumber) ??
    state.profileOrders.orders.find((order) => order.number === orderNumber) ??
    (state.order.orderData?.number === orderNumber ? state.order.orderData : null);

export const selectOrderError = (state: RootState): string | null =>
  state.order.orderError;
