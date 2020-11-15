export type Paginated<Result> = {
  page: number;
  totalPages: number;
  results: Result[];
};

export const makeEmptyPaginatedResponse = <T>(): Paginated<T> => {
  return {
    page: 1,
    totalPages: 1,
    results: [],
  };
};
