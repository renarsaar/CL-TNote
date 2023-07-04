export interface Note {
  id: string,
  category: string | null,
  text: string,
  favorite: boolean,
  created: string,
  scratchPad?: boolean,
  lastUpdated?: string | null,
}