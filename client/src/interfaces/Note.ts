export interface Note {
  id: string,
  category: string | null,
  text: string,
  favorite: boolean,
  created: string,
  lastUpdated?: string | null,
}