import { Note } from './Note';

export interface Category {
  id: string,
  title: string,
  notes: Note[],
  createdAt: Date,
  updatedAt: Date,
}
