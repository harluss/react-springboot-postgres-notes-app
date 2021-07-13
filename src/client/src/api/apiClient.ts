import axios, { CancelToken } from 'axios';

const apiClient = axios.create();

// axios interceptors

export * from 'axios';

export const apiClientCancelToken = axios.CancelToken;

export const get = <T>(url: string, cancelToken: CancelToken) => apiClient.get<T>(url, { cancelToken });

export const post = <T, U>(url: string, body: U) => apiClient.post<T>(url, body);

export const del = (url: string) => apiClient.delete(url);

export const put = <T, U>(url: string, body: U) => apiClient.put<T>(url, body);
