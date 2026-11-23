import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { logoutUser } from './user';

import type { RootState } from '../store';
import type { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const fetchProfileOrders = createAsyncThunk('profileOrders/fetchAll', async () =>
  getOrdersApi()
);

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

export const selectProfileOrders = (state: RootState): TOrder[] =>
  state.profileOrders.orders;
