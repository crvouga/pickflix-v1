import { PaginationOptions } from "../data-access/types";
import { castArray, castPositiveNumber } from "../utils";

export const DEFAULT_PAGE_SIZE = 20;

export const makePaginationOptions = ({
  pageSize,
  page,
}: {
  pageSize?: any;
  page?: any;
}): PaginationOptions => {
  return {
    page: castPositiveNumber(page ?? 1),
    pageSize: castPositiveNumber(pageSize ?? DEFAULT_PAGE_SIZE),
  };
};

type Paginated<Result> = {
  page: number;
  totalPages?: number;
  results: Result[];
};

export const makePaginationResponse = <T>({
  results,
  page,
}: {
  results: T[];
  page: number;
}): Paginated<T> => {
  return {
    results: castArray<T>(results),
    page: castPositiveNumber(page),
  };
};
