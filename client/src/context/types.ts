import { Dispatch, SetStateAction } from 'react'

export type ConfigObject = {
  [key: string]: any
}

export type ConfigContextState = {
  configs: ConfigObject
  addConfig: (prevConfig: any, config: ConfigObject) => void
}

export type ActiveNoteTooltipState = {
  activeNoteId: string | null
  setActiveNoteId: Dispatch<SetStateAction<string | null>>
  clearActiveNoteId: () => void
}

export type ActiveCategoryTooltipState = {
  activeCategoryId: string | null
  setActiveCategoryId: Dispatch<SetStateAction<string | null>>
  clearActiveCategoryId: () => void
}

export type ActiveCategoryFormState = {
  activeCategoryFormId: string | null
  setActiveCategoryFormId: Dispatch<SetStateAction<string | null>>
  clearActiveCategoryFormId: () => void
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
