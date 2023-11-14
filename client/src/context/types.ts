import { Dispatch, SetStateAction } from 'react'

export type ConfigObject = {
  [key: string]: any
}

export type ConfigContextState = {
  configs: ConfigObject
  addConfig: (prevConfig: any, config: ConfigObject) => void
}

export type NoteTooltipState = {
  noteId: string | null
  setNoteId: Dispatch<SetStateAction<string | null>>
  clearNoteId: () => void
}

export type CategoryTooltipState = {
  categoryId: string | null
  setCategoryId: Dispatch<SetStateAction<string | null>>
  clearCategoryId: () => void
}

export type RenameCategoryState = {
  formId: string | null
  setFormId: Dispatch<SetStateAction<string | null>>
  clearFormId: () => void
}

export type SearchState = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export type ResizerContextState = {
  appSideBarDrag: boolean
  appSideBarWidth: number
  noteSideBarDrag: boolean
  noteSideBarWidth: number
  handleAppSideBarDrag: (drag: boolean) => void
  handleAppSideBarWidth: (width: number) => void
  handleNoteSideBarDrag: (drag: boolean) => void
  handleNoteSideBarWidth: (width: number) => void
}
