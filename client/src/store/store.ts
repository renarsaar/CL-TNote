import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import notesReducers from './notes/notesSlice'
import scratchpadReducers from './scratchpad/scratchpadSlice'
import categoriesReducers from './categories/categorySlice'
import navigationReducers from './navigation/navigationSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducers,
    scratchpad: scratchpadReducers,
    categories: categoriesReducers,
    navigation: navigationReducers
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
