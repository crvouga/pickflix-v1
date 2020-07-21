import * as R from "ramda";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "../../api";
import useDeferredValue from "../../common/hooks/useDeferredValue";

export const cancelableRequest = (asyncFn) => (...args) => {
  const source = api.CancelToken.source();
  const config = {
    cancelToken: source.token,
  };
  const promise = asyncFn(config, ...args);
  promise.cancel = () => {
    console.log("Query was cancelled by React Query");
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export default ({ text, page }) => {
  const deferredText = useDeferredValue(text.toLowerCase().trim(), 1000 / 3);

  const query = useQuery(
    ["search", deferredText, page],
    cancelableRequest(async (config, ...args) => {
      if (deferredText.length === 0) {
        return { results: [] };
      }
      const response = await api.get("/api/tmdb/search/multi", {
        ...config,
        params: { query: encodeURI(deferredText), page: page },
      });
      return response.data;
    }),
    {
      staleTime: Infinity,
    }
  );

  const [results, setResults] = useState([]);

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
