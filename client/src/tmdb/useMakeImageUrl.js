import axios from "axios";
import * as R from "ramda";
import { useQuery } from "react-query";
import makeImageUrl from "./makeImageURL";

export default () => {
  const query = useQuery(
    "TMDBconfiguration",
    () => axios.get("/api/tmdb/configuration").then((res) => res.data),
    {
      staleTime: Infinity,
    }
  );

  const configuration = query.data;

  return query.status === "success"
    ? R.curry(makeImageUrl)(configuration)
    : R.always("");
};
