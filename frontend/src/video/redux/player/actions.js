import { createAction } from "@reduxjs/toolkit";

export const setVideo = createAction("[player] SET_VIDEO");
export const setPlaylist = createAction("[player] SET_PLAYLIST");
export const setIsPlaying = createAction("[player] SET_IS_PLAYING");
//
export const play = createAction("[player] PLAY");
export const pause = createAction("[player] PAUSE");
export const progress = createAction("[player] PROGRESS");
export const toggle = createAction("[player] TOGGLE");
