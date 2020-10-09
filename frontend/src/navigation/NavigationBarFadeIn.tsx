import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import { useViewportScroll } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux";
import { useHistory } from "react-router";

type Props = {
  title?: string;
  subtitle?: string;
  scrollHeightUntilFullOpacity?: number;
};

type StyleProps = {
  opacity: number;
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: ({ opacity }: StyleProps) =>
      fade(theme.palette.background.paper, opacity),
  },

  title: {
    flex: 1,
    fontWeight: "bold",
    opacity: ({ opacity }: StyleProps) => opacity,
  },
}));

const useOpacity = (scrollHeightUntilFullOpacity: number) => {
  const [opacity, setOpacity] = useState(0);

  const { scrollY } = useViewportScroll();

  scrollY.onChange((scrollY) => {
    const opacity = Math.min(scrollY / scrollHeightUntilFullOpacity, 1);
    setOpacity(opacity);
  });

  return opacity;
};

export default (props: Props) => {
  const { title, scrollHeightUntilFullOpacity = 200 } = props;
  const opacity = useOpacity(scrollHeightUntilFullOpacity);
  const classes = useStyles({ opacity });
  const dispatch = useDispatch();
  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  const onSearch = () => {
    history.push("/search");
  };

  return (
    <AppBar elevation={Math.floor(opacity)} className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" onClick={onBack}>
          <ArrowBackIosIcon />
        </IconButton>

        <Typography
          className={classes.title}
          variant="h6"
          color="textPrimary"
          noWrap
        >
          {title}
        </Typography>

        <IconButton onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
