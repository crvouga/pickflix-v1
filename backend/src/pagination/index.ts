import { PaginationOptions } from "../unit-of-work/types";

export const DEFAULT_PAGE_SIZE = 20;

export const castPositiveNumber = (number: any) => {
  if (typeof number === "number" && number > 0) {
    return number;
  }
  throw new Error("invalid positive number");
};

export const castArray = (array: any) => {
  if (Array.isArray(array)) {
    return array;
  }
  throw new Error("invalid array");
};

export const makePaginationOptions = ({
  pageSize,
  pageNumber,
}: {
  pageSize?: any;
  pageNumber?: any;
}): PaginationOptions => {
  return {
    pageNumber: castPositiveNumber(pageNumber ?? 1),
    pageSize: castPositiveNumber(pageSize ?? DEFAULT_PAGE_SIZE),
  };
};

type PaginationResponse<T> = {
  results: T[];
  pageNumber: number;
};

export const makePaginationResponse = <T>({
  results,
  pageNumber,
}: {
  results: T[];
  pageNumber: number;
}): PaginationResponse<T> => {
  return {
    results: castArray(results),
    pageNumber: castPositiveNumber(pageNumber),
  };
};
