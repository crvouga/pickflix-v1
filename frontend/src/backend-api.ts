import axios from "axios";

export const BackendAPI = axios.create({
  withCredentials: true,
});

export type PaginationResponse<T> = {
  results: T[];
  pageNumber: number;
};
