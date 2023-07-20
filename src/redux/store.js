import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';
import contactsSliceReducer from './contactsSlice';
import filterSliceReducer from './filterSlice';

const rootReducer = combineReducers({
  contacts: contactsSliceReducer,
  filtered: filterSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
