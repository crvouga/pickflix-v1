import { Collection } from "../../tmdb/types";

export const collectionToBackdropPath = (collection: Collection) =>
  collection.backdropPath ||
  collection.parts.find((part) => part.backdropPath)?.backdropPath ||
  "";
