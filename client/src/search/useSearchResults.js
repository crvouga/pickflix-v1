import * as R from "ramda";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import useDeferredValue from "../common/useDeferredValue";

export const cancelableRequest = (asyncFn) => (...args) => {
  const source = axios.CancelToken.source();
  const config = {
    cancelToken: source.token,
  };
  const promise = asyncFn(args, config);
  promise.cancel = () => {
    console.log("CANCEL()");
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export default ({ text, page }) => {
  const [results, setResults] = useState([]);
  const deferredText = useDeferredValue(text.toLowerCase().trim(), 1000 / 3);

  const query = useQuery(
    ["search", deferredText, page],
    cancelableRequest(async (args, config) => {
      if (deferredText.length === 0) {
        return { results: [] };
      }
      const response = await axios.get("/api/tmdb/search/multi", {
        ...config,
        params: { query: deferredText, page: page },
      });
      return response.data;
    }),
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (query.status === "success") {
      const data = R.pathOr([], ["data", "results"], query);

      const newResults = R.pipe(R.reject(R.whereEq({ mediaType: "tv" })))(data);

      if (newResults.length > 0) {
        setResults(newResults);
      }
    }
  }, [query.status, deferredText, text]);

  const totalResults = R.propOr(0, "totalResults", query.data);
  const totalPages = R.propOr(0, "totalPages", query.data);

  return {
    query,
    deferredText,
    results,
    totalResults,
    totalPages,
  };
};
