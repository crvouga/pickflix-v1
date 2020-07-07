import {
  ButtonBase,
  Fade,
  makeStyles,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import AspectRatio from "../common/AspectRatio";
import useMakeImageUrl from "../api/useMakeImageUrl";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  image: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
  },
  fallback: {
    padding: theme.spacing(1),
    width: "100%",
    height: "100%",
    wordBreak: "break-all",
  },
}));

export default ({ movie, ...props }) => {
  const { id, posterPath, title } = movie;
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = () => setLoaded(true);
  const classes = useStyles();
  const makeImageUrl = useMakeImageUrl();
  const posterURL = makeImageUrl(2, { posterPath });

  const onClick = () => {
    history.push(`/movie/${id}`);
  };

  return (
    <AspectRatio
      ratio={[2, 3]}
      onClick={onClick}
      className={classes.root}
      {...props}
    >
      {posterPath ? (
        <React.Fragment>
          <Fade in={loaded}>
            <img
              className={classes.image}
              src={posterURL}
              onLoad={handleLoaded}
            />
          </Fade>
        </React.Fragment>
      ) : (
        <Typography
          align="center"
          color="textSecondary"
          className={classes.fallback}
        >
          {title}
        </Typography>
      )}
    </AspectRatio>
  );
};
