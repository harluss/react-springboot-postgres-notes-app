export enum SortBy {
  dateUp = 'Date: Ascending',
  dateDown = 'Date: Descending',
}

export type SortByKeys = keyof typeof SortBy;
