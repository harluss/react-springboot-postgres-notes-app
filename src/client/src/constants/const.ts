export const APP_TITLE = 'Welcome to Some Notes';

export const SNACKBAR_NOTE_ADD_SUCCESS = 'Note added';
export const SNACKBAR_NOTE_ADD_ERROR = (message: string) => `Failed to add note: ${message}`;
export const SNACKBAR_NOTE_EDIT_SUCCESS = 'Note edited';
export const SNACKBAR_NOTE_EDIT_ERROR = (message: string) => `Failed to edit note: ${message}`;
export const SNACKBAR_NOTE_DELETE_SUCCESS = 'Note deleted';
export const SNACKBAR_NOTE_DELETE_ERROR = (message: string) => `Failed to delete note: ${message}`;
export const SNACKBAR_NOTE_PIN_SUCCESS = (isPinned: boolean) => `Note ${isPinned ? 'pinned' : 'unpinned'}`;
export const SNACKBAR_NOTE_PIN_ERROR = (message: string) => `Failed to update note: ${message}`;
export const SNACKBAR_NOTES_LOAD_ERROR = (message: string) => `Failed to load notes: ${message}`;

export const MESSAGE_UNSAVED_CHANGES = 'You have unsaved changes, are you sure you want to leave?';
export const MESSAGE_NO_NOTE_SELECTED = 'Oops! Did you forget to select note?';
export const MESSAGE_GENERIC_ERROR = 'Oops! Something went wrong...';
export const MESSAGE_ROUTE_404 = 'Oops, 404! Page not found.';
export const MESSAGE_NO_NOTES_SAVED = 'You have no saved notes.';
export const MESSAGE_NOTE_DELETE_WARNING = (title: string) => `Note "${title}" will be deleted.`;

export const ABORT_REQ_ERROR_NAME = 'AbortError';
