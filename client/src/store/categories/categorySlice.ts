import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';
import { Category } from '../../interfaces/Category';

type CategoryState = Category[]

const initialState: CategoryState = []

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: (state: CategoryState) => {
      const categories = localStorage.getItem('categories')
      const category: Category = {
        id: 'bfaa5cdc-283a-48ad-baa0-614fcf277fbf',
        name: 'Bugs'
      }

      if (categories === null) {
        localStorage.setItem('categories', JSON.stringify([category]))

        state.push(category)
      } else {
        state = JSON.parse(categories)
      }

      return state
    },
    createCategory: (state: CategoryState, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload

      state.forEach((category) => {
        if (category.name === name) return
      })

      const category: Category = {
        id: uuidv4(),
        name
      }

      localStorage.setItem('categories', JSON.stringify({
        ...state,
        category
      }))
    },
    editCategory: (state: CategoryState, action: PayloadAction<{ category: Category, value: string }>) => {
      const { category, value } = action.payload
      const duplicate = state.some((item) => item.name === value)

      if (duplicate === true) return

      state.map((item) => {
        if (category.id === item.id) {
          item.name = value
        }

        return item
      })

      localStorage.setItem('categories', JSON.stringify({
        ...state
      }))
    },
    deleteCategory: (state: CategoryState, action: PayloadAction<{ category: Category }>) => {
      const { category } = action.payload
      const index = state.indexOf(category)

      state.splice(index, 1)

      localStorage.setItem('categories', JSON.stringify({
        ...state
      }))
    }
  }
})

export const { getCategories, createCategory, editCategory, deleteCategory } = categorySlice.actions
export const selectCategories = (state: RootState) => state.categories
export default categorySlice.reducer