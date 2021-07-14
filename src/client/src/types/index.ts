export type Note = {
  id: string;
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

export type NoteAdd = NoteInputs;

export type NoteAddInputs = keyof NoteAdd;

export type NoteEdit = NoteInputs;

export type NoteEditInputs = keyof NoteEdit;

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

export type HistoryProps = {
  path: string;
  state: unknown;
};
