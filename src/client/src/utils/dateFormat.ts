import { format } from 'date-fns';

export const formatDate = (date: string) => format(new Date(date), 'PPPP');

export const formatDateTime = (date: string) => format(new Date(date), 'PPPPpp');
