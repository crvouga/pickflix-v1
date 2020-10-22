import { useQuery } from "react-query";
import { TmdbMediaType } from "../../tmdb/types";
import { queryKeys } from "./query-keys";
import { getReviews } from "./reads";

export const useQueryReviews = ({
  tmdbMediaId,
  tmdbMediaType,
}: {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
}) => {
  return useQuery(queryKeys.reviews({ tmdbMediaId, tmdbMediaType }), () =>
    getReviews({
      tmdbMediaId,
      tmdbMediaType,
    })
  );
};
