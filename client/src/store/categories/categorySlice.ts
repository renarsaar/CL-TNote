import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';
import { Category } from '../../interfaces/Category';

type CategoryState = {
  categories: Category[],
  selectedCategory: Category | null
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: (state: CategoryState) => {
      const categories: string | null = localStorage.getItem('categories')

      if (categories === null) {
        const testCategories: Category[] = [
          {
            id: uuidv4(),
            name: 'Bugs'
          },
          {
            id: uuidv4(),
            name: 'Folder'
          }
        ]

        state.categories = testCategories
        state.selectedCategory = null

        localStorage.setItem('categories', JSON.stringify({ ...state }))
      } else {
        const newCategories: CategoryState = JSON.parse(categories)

        state.categories = newCategories.categories
        state.selectedCategory = newCategories.selectedCategory
      }
    },
    setSelectedCategory: (state: CategoryState, action: PayloadAction<{ category: Category | null | undefined }>) => {
      const { category } = action.payload

      !category
        ? state.selectedCategory = null
        : state.selectedCategory = category

      localStorage.setItem('categories', JSON.stringify({ ...state }))
    },
    createCategory: (state: CategoryState, action: PayloadAction<{ value: string }>) => {
      const value = action.payload.value.trim()

      if (value === '') return

      // Check if category already exists
      state.categories.forEach((category) => {
        if (category.name === value) return
      })

      const category: Category = {
        id: uuidv4(),
        name: value
      }

      state.categories.push(category)

      localStorage.setItem('categories', JSON.stringify({ ...state }))
    },
    editCategory: (state: CategoryState, action: PayloadAction<{ categoryId: string | '', value: string }>) => {
      const { categoryId, value } = action.payload

      if (value === '') return

      const duplicate = state.categories.some((category) => {
        return category.name === value
      })

      if (duplicate === true) return

      const findCategory = state.categories.find((category) => category.id === categoryId)

      if (findCategory === undefined) return

      findCategory.name = value
      localStorage.setItem('categories', JSON.stringify({ ...state }))
    },
    deleteCategory: (state: CategoryState, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      state.categories = state.categories.filter((category) => category.id !== id)

      if (state.selectedCategory?.id === id) state.selectedCategory = state.categories[0]

      localStorage.setItem('categories', JSON.stringify({ ...state }))
    }
  }
})

export const { getCategories, setSelectedCategory, createCategory, editCategory, deleteCategory } = categorySlice.actions
export const selectCategories = (state: RootState) => state.categories.categories
export const selectSelectedCategory = (state: RootState) => state.categories.selectedCategory
export default categorySlice.reducer