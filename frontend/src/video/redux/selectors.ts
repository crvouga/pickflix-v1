import { AppState } from "../../redux/types";

export const isPlaying = (state: AppState) => state.video.isPlaying;
export const video = (state: AppState) => state.video.video;
export const playlist = (state: AppState) => state.video.playlist;
