import {
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import * as R from "ramda";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  videoTypeChip: {
    marginRight: theme.spacing(1),
  },
  videoTypeChipContainer: {
    padding: theme.spacing(1),
    paddingBottom: 0,
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
  },

  thumbnail: {
    marginRight: theme.spacing(1),
  },
  videoListItem: {
    padding: theme.spacing(1),
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },

  videoListItemIndex: {
    padding: 0,
    marginRight: theme.spacing(1),
    width: "1em",
  },
  videoListSubHeaderChips: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    overflowY: "hidden",
  },
  subheaderHead: {
    width: "100%",
    height: "100%",
  },
}));

export default ({
  videos = [],
  selectedVideo = undefined,
  isPlaying = false,
  onVideoClick = () => {},
}) => {
  const classes = useStyles();

  const videoTypeCounts = R.countBy(R.prop("type"), videos);
  const videoTypes = R.uniq(R.pluck("type", videos));
  const [selectedVideoType, setSelectedVideoType] = useState(videoTypes[0]);

  return (
    <React.Fragment>
      <div className={classes.videoTypeChipContainer}>
        {videoTypes.map((videoType) => (
          <Chip
            key={videoType}
            className={classes.videoTypeChip}
            onClick={() => setSelectedVideoType(videoType)}
            label={[videoType, videoTypeCounts[videoType]].join(" · ")}
            clickable
            variant={videoType === selectedVideoType ? "default" : "outlined"}
          />
        ))}
      </div>

      <List>
        {videos.filter(R.whereEq({ type: selectedVideoType })).map((video) => (
          <ListItem
            key={`${video.key},${video.type}`}
            button
            className={classes.videoListItem}
            onClick={() => onVideoClick(video)}
            selected={selectedVideo.key === video.key}
          >
            <ListItemIcon>
              {isPlaying && selectedVideo.key === video.key ? (
                <PauseIcon />
              ) : (
                <PlayArrowIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={video.name} secondary={video.type} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};
