import { useEffect } from "react";
import { useQuery } from "react-query";
import { getTmdbConfiguration, queryKeys } from "./query";

type Props = {
  loading: any;
  children?: any;
};

export const TMDB_CONFIGURATION_KEY = "tmdbConfiguration";

export default ({ loading, children }: Props) => {
  const query = useQuery(
    queryKeys.tmdbConfiguration(),
    () => getTmdbConfiguration(),
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (query.data) {
      localStorage.setItem(TMDB_CONFIGURATION_KEY, JSON.stringify(query.data));
    }
  }, [query.data]);

  if (!query.data || query.error) {
    return loading;
  }

  return children;
};
