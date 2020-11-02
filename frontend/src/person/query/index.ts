import { BackendAPI } from "../../backend-api";
import {
  PersonDetailsResponse,
  PersonImagesResponse,
  PersonMovieCreditsResponse,
} from "../../tmdb/types";

type PersonPageResponse = {
  credits: PersonMovieCreditsResponse;
  images: PersonImagesResponse;
} & PersonDetailsResponse;

export const queryKeys = {
  personPage: (tmdbMediaId: string) => ["person", tmdbMediaId],
};

export const getPersonPage = async (tmdbMediaId: string) => {
  const { data } = await BackendAPI.get<PersonPageResponse>(
    `/api/tmdb/person/${tmdbMediaId}`,
    {
      params: {
        appendToResponse: [
          "credits",
          "movie_credits",
          "images",
          "tagged_images",
        ],
      },
    }
  );

  return data;
};
