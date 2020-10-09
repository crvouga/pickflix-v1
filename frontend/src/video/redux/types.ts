import { MovieVideo } from "../../tmdb/types";

export interface VideoProgress {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export interface VideoState {
  isPlaying: boolean;
  video: MovieVideo | undefined;
  playlist: MovieVideo[];
}

export const initialState: VideoState = {
  isPlaying: false,
  video: undefined,
  playlist: [],
};
