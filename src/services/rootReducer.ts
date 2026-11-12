import { combineReducers } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './slices/burger-constructor';
import { ingredientsSlice } from './slices/ingredients';
import { orderSlice } from './slices/order';
import { userSlice } from './slices/user';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
});
