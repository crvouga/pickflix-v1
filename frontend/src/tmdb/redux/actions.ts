import { createAction } from "@reduxjs/toolkit";
import { TmdbMedia } from "../types";

export const addLike = createAction<TmdbMedia>("[tmdb] ADD_LIKE");
export const removeLike = createAction<TmdbMedia>("[tmdb] REMOVE_LIKE");
export const toggleLike = createAction<TmdbMedia>("[tmdb] TOGGLE_LIKE");
