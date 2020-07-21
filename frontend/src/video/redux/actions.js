import { createAction } from "@reduxjs/toolkit";

export default {
  play: createAction("player/play"),
  pause: createAction("player/pause"),
  toggle: createAction("player/toggle"),
  setVideo: createAction("player/setVideo"),
  setPlaylist: createAction("player/setPlaylist"),
};
