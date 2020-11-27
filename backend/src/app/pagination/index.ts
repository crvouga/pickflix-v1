import { PaginationOptions } from "../data-access/types";

export const DEFAULT_PAGE_SIZE = 20;

export const castPositiveNumber = (anything: any) => {
  const number = Number(anything);
  if (number > 0) {
    return number;
  }
  throw new Error("invalid positive number");
};

export const castArray = <T>(array: any) => {
  if (Array.isArray(array)) {
    return array as T[];
  }
  throw new Error("invalid array");
};

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
