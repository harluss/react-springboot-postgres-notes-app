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

export type NoteInputsKeys = keyof NoteInputs;

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

export type HistoryProps = {
  path: string;
  state: unknown;
};
