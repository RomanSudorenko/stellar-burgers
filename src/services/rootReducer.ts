import { combineReducers } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './slices/burger-constructor';
import { ingredientsSlice } from './slices/ingredients';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
});
