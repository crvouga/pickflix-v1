import axios from "axios";

//DOCS: https://react-query.tanstack.com/docs/guides/query-cancellation
export const makeCancelable = <T>(promise: Promise<T>) => {
  const source = axios.CancelToken.source();

  //@ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};
