import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { MovieVideo } from "../tmdb/types";
import { video } from "./redux/video";

export default () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(video.actions, dispatch);
  const slice = useSelector(video.selectors.slice);

  const selectVideo = (video: MovieVideo) => {
    actions.setCurrentVideo(video);
    actions.setLight(undefined);
    actions.setIsPlaying(true);
  };

  return {
    ...slice,
    ...actions,
    selectVideo,
  };
};
