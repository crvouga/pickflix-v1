import {
  Box,
  ButtonBase,
  Collapse,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import ReactMarkdown from "react-markdown";
import ExpandIcon from "../common/ExpandIcon";
import useBoolean from "../common/useBoolean";

const useStyles = makeStyles((theme) => ({
  mainDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  details: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  expandIconContainer: {
    marginBottom: "auto",
  },
  expandIcon: {
    color: theme.palette.text.secondary,
    marginBottom: "auto",
  },
  markdown: {
    userSelect: "text",
    // fontSize: "inherit",
    // font: "inherit",
    maxWidth: "100%",
    marginTop: -theme.spacing(1.5),
    "& a": {
      color: theme.palette.info.main,
      textDecoration: "none",
      wordBreak: "break-all",
    },
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-around",
  },

  iconButton: {
    marginLeft: -theme.spacing(1),
  },
  icon: {
    width: "0.7em",
    height: "0.7em",
  },
  iconLabel: {
    marginTop: "0.75em",
    marginLeft: "-0.5em",
  },
}));

const formatNumberShort = (number) =>
  numeral(number).format("0.0a").replace(".0", "").toUpperCase();

const formatNumberLong = (number) => numeral(number).format("0,0");

export default ({ statistics, snippet }) => {
  const classes = useStyles();

  const {
    categoryId,
    channelId,
    channelTitle,
    defaultAudioLanguage,
    description,
    liveBroadcastContent,
    localized,
    publishedAt,
    tags,
    thumbnails,
    title,
  } = snippet;
  const {
    commentCount,
    dislikeCount,
    favoriteCount,
    likeCount,
    viewCount,
  } = statistics;

  const isDetailsOpen = useBoolean(false);

  const formattedPublishedAtAge = moment(publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ")
    .replace(" ago", "");

  const formattedPublishedAt = moment(publishedAt).format("ll");

  const subtitle1 = [
    viewCount &&
      `${
        isDetailsOpen.value
          ? formatNumberLong(viewCount)
          : formatNumberShort(viewCount)
      } views`,
    formattedPublishedAtAge,
  ]
    .filter((_) => _)
    .join(" • ");

  const subtitle2 = [
    `👍${formatNumberShort(likeCount)}`,
    `👎${formatNumberShort(dislikeCount)}`,
  ].join(" • ");

  return (
    <React.Fragment>
      <ButtonBase
        component="div"
        onClick={isDetailsOpen.toggle}
        className={classes.details}
      >
        <div className={classes.mainDetails}>
          <Typography variant="h6">{title}</Typography>

          <Typography color="textSecondary" variant="subtitle1">
            {subtitle1}
          </Typography>
        </div>
        <div className={classes.expandIconContainer}>
          <ExpandIcon
            className={classes.expandIcon}
            expanded={isDetailsOpen.value}
          />
        </div>
      </ButtonBase>

      <Box paddingLeft={2} className={classes.actions} color="text.secondary">
        <Box
          component="span"
          display="flex"
          flexDirection="row"
          marginRight={2}
        >
          <IconButton className={classes.iconButton} color="inherit">
            <ThumbUpIcon className={classes.icon} />
          </IconButton>
          <Typography className={classes.iconLabel} color="inherit">
            {formatNumberShort(likeCount)}
          </Typography>
        </Box>

        <IconButton className={classes.iconButton} color="inherit">
          <ThumbDownIcon className={classes.icon} />
        </IconButton>
        <Typography className={classes.iconLabel} color="inherit">
          {formatNumberShort(dislikeCount)}
        </Typography>
      </Box>

      <Collapse in={isDetailsOpen.value}>
        <Box p={2}>
          <Box marginBottom={3}>
            <Typography color="textSecondary" variant="body2">
              {`Published on ${formattedPublishedAt}`}
            </Typography>
          </Box>

          <Typography component="div" color="textSecondary" variant="body2">
            <ReactMarkdown className={classes.markdown} source={description} />
          </Typography>
        </Box>
      </Collapse>
    </React.Fragment>
  );
};
