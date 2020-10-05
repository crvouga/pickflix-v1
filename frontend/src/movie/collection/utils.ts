import { Collection } from "../../tmdb/types";

export const collectionToBackdropPath = (collection: Collection) =>
  collection.backdropPath ||
  collection.parts.find((part) => typeof part.backdropPath === "string")
    ?.backdropPath ||
  collection.posterPath ||
  collection.parts.find((part) => typeof part.posterPath === "string")
    ?.posterPath ||
  "";
