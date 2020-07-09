import {
  Avatar,
  ButtonBase,
  Collapse,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import * as R from "ramda";
import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import useBoolean from "../common/useBoolean";

const TMDB_Colors = {
  /* SOURCE: https://www.themoviedb.org/about/logos-attribution?language=en-US */
  primary: "#0d253f",
  secondary: "#01b4e4",
  tertiary: "#90cea1",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: "100%",
  },
  icon: {
    fontSize: "1em",
    marginBottom: "-0.1em",
  },
  content: {
    maxWidth: "100%",

    paddingLeft: theme.spacing(1),
  },
  markdown: {
    userSelect: "text",
    // fontSize: "inherit",
    // font: "inherit",
    wordBreak: "break-word",
    maxWidth: "100%",
    marginTop: -theme.spacing(1.5),
    "& a": {
      color: theme.palette.info.main,
      textDecoration: "none",
      wordBreak: "break-all",
    },
  },

  lastLine: {
    display: "flex",
    flexDirection: "rowReverse",
  },
  readMoreReadLess: {
    color: theme.palette.text.secondary,
    margin: "auto",
    fontWeight: "bold",
    padding: theme.spacing(1),
  },
  avatar: {
    textDecoration: "none",
    color: TMDB_Colors.primary,
    background: `linear-gradient(${TMDB_Colors.tertiary}, ${TMDB_Colors.secondary})`,
  },
}));

const COLLAPSED_HEIGHT = 120;

export default ({ collapsible, review }) => {
  const isExpanded = useBoolean(false);
  const markdownRef = useRef();
  const classes = useStyles();
  const { id, url, content, author } = review;
  const initials = R.pipe(
    R.split(" "),
    R.pluck(0),
    R.join(""),
    R.toUpper,
    R.take(2)
  )(author);

  const markdownHeight = markdownRef.current
    ? markdownRef.current.clientHeight
    : Infinity;

  const bodyComponent = (
    <Typography component="div" ref={markdownRef} variant="body1">
      <ReactMarkdown className={classes.markdown}>{content}</ReactMarkdown>
    </Typography>
  );

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} component="a" href={url}>
        {initials}
      </Avatar>

      <div className={classes.content}>
        <Typography variant="subtitle2" color="textSecondary">
          {author} · TMDb <LaunchIcon className={classes.icon} />
        </Typography>

        {collapsible ? (
          <React.Fragment>
            <Collapse
              in={isExpanded.value}
              collapsedHeight={Math.min(COLLAPSED_HEIGHT, markdownHeight)}
            >
              {bodyComponent}
            </Collapse>
            {markdownHeight > COLLAPSED_HEIGHT && (
              <ButtonBase
                component={Typography}
                align="center"
                className={classes.readMoreReadLess}
                onClick={isExpanded.toggle}
              >
                {isExpanded.value ? "Read Less" : "Read More"}
              </ButtonBase>
            )}
          </React.Fragment>
        ) : (
          bodyComponent
        )}
      </div>
    </div>
  );
};
