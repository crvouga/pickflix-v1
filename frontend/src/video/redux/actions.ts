import { createAction } from "@reduxjs/toolkit";
import { MovieVideo } from "../../tmdb/types";
import { VideoProgress } from "./types";

export const setVideo = createAction<MovieVideo | undefined>(
  "[player] SET_VIDEO"
);
export const setPlaylist = createAction<MovieVideo[]>("[player] SET_PLAYLIST");
export const setIsPlaying = createAction<boolean>("[player] SET_IS_PLAYING");
//
export const play = createAction("[player] PLAY");
export const pause = createAction("[player] PAUSE");
export const progress = createAction<VideoProgress>("[player] PROGRESS");
export const toggle = createAction("[player] TOGGLE");
