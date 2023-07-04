import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notesReducers from './notes/notesSlice'
import categoriesReducers from './categories/categorySlice'

export const store = configureStore({
  reducer: {
    notes: notesReducers,
    categories: categoriesReducers
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
