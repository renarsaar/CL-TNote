export interface Note {
  id: string,
  categoryId: string,
  title: string,
  note: string,
  favorite: boolean,
  trash: boolean,
  createdAt: Date,
  updatedAt: Date,
  scratchPad?: boolean,
}