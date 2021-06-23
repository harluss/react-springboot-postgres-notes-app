export type Note = {
  id: number;
  title: string;
  details: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NoteInputs = {
  title: string;
  details: string;
  isPinned: boolean;
};

export type AddNote = NoteInputs;

export type EditNote = NoteInputs;

export enum SortBy {
  dateUp = 'Date: Ascending',
  dateDown = 'Date: Descending',
}

export type SortByKeys = keyof typeof SortBy;

export enum Paths {
  notes = '/',
  addNote = '/create',
  editNote = '/edit',
  viewNote = '/note',
}
