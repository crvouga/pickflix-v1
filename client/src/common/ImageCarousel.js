import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import R from "ramda";
import React, { useState } from "react";
import _SwipeableViews from "react-swipeable-views";
import { autoPlay, bindKeyboard } from "react-swipeable-views-utils";

const SwipeableViews = R.pipe(
  bindKeyboard
  // autoPlay
)(_SwipeableViews);

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    maxWidth: "720px",
    borderRadius: theme.spacing(1),
  },
  imageIndexContainer: {
    textAlign: "center",
    width: "180px",
  },
}));

const ImageCarousel = ({ images }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  return (
    <div className={classes.imageIndexContainer}>
      <SwipeableViews autoPlay={false} index={index} onChangeIndex={setIndex}>
        {images.map(({ src }) => (
          <Paper
            className={classes.image}
            component="img"
            key={src}
            src={src}
          />
        ))}
      </SwipeableViews>
      {images.length > 1 && (
        <Typography color="textSecondary">
          {index + 1} / {images.length}
        </Typography>
      )}
    </div>
  );
};

export default ImageCarousel;
