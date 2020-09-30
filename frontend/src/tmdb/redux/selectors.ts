import { AppState } from "../../redux/types";
import { TmdbMedia } from "../types";
import { tmdbMediaToEntityId } from "./query-configs";

export const tmdb = (state: AppState) => state.tmdb;

export const isLiked = (tmdbMedia: TmdbMedia) => (state: AppState): boolean =>
  state.query.entities?.likes?.[tmdbMediaToEntityId(tmdbMedia)] || false;
