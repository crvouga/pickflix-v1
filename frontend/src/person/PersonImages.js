import { makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import useImageQuery from "../API/useImageQuery";

const useStyles = makeStyles((theme) => ({
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
  },

  mainImageContainer: {
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(4),
    // backgroundColor: theme.palette.background.paper
  },
  mainImage: {
    margin: "auto",
    width: "200px",
    height: "300px",
    borderRadius: theme.spacing(1),
  },
  imageScroll: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
  },

  imageItemContainer: {},

  imageItem: {
    width: "60px",
    height: "auto",
    margin: theme.spacing(1),

    borderRadius: theme.spacing(1),
  },
  selected: {
    borderBottom: `solid ${theme.palette.secondary.main} ${theme.spacing(1)}`,
  },
}));

const renderProfile = (profile) => {
  const imageQuery = useImageQuery("profile", 3, profile.filePath);
  return (
    <div key={image.src} className={classes.mainImageContainer}>
      {imageQuery.status === "success" && <img src={imageQuery.data} />}
    </div>
  );
};

const Images = ({ profiles }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div>
        <SwipeableViews index={index} onChangeIndex={setIndex}>
          {profiles.map(renderProfile)}
        </SwipeableViews>
      </div>
      {profiles.length > 1 && (
        <div className={classes.imageScroll}>
          {profiles.map((image, i) => (
            <img
              onClick={() => setIndex(i)}
              className={clsx(classes.imageItem, {
                [classes.selected]: i === index,
              })}
              key={image.src}
              src={image.src}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Images;
