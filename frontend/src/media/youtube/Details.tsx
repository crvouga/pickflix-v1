import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import MarkdownTypography from "../../common/components/MarkdownTypography"
import ExpandIcon from "../../common/components/ExpandIcon";
import useBoolean from "../../common/hooks/useBoolean";
import { YoutubeVideoSnippet, YoutubeVideoStatistics } from "./query/types";

const useStyles = makeStyles((theme) => ({
  mainDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    marginTop: "0.6em",
    marginLeft: "-0.5em",
  },
}));

const formatNumberShort = (number: number) =>
  numeral(number).format("0.0a").replace(".0", "").toUpperCase();

const formatNumberLong = (number: number) => numeral(number).format("0,0");

type Props = {
  statistics: YoutubeVideoStatistics;
  snippet: YoutubeVideoSnippet;
};

export default ({ statistics, snippet }: Props) => {
  const classes = useStyles();

  const { description, publishedAt, title } = snippet;
  const { dislikeCount, likeCount, viewCount } = statistics;

  const isDetailsOpen = useBoolean(false);

  const formattedPublishedAtAge = moment(publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ")
    .replace(" ago", "");

  const formattedPublishedAt = moment(publishedAt).format("ll");

  const subtitle1 = [
    viewCount &&
    `${isDetailsOpen.value
      ? formatNumberLong(viewCount)
      : formatNumberShort(viewCount)
    } views`,
    formattedPublishedAtAge,
  ]
    .filter((_) => _)
    .join(" • ");

  return (
    <React.Fragment>
      <List>
        <ListItem button onClick={isDetailsOpen.toggle} alignItems="flex-start">
          <ListItemText
            primaryTypographyProps={{
              variant: "h6",
              style: { fontWeight: "bold" },
            }}
            primary={title}
            secondaryTypographyProps={{ variant: "subtitle1" }}
            secondary={subtitle1}
          />
          <ListItemSecondaryAction>
            <ExpandIcon expanded={isDetailsOpen.value} />
          </ListItemSecondaryAction>
        </ListItem>

        <Box
          paddingX={1}
          color="text.secondary"
          display="flex"
          flexDirection="row"
        >
          <Box
            component="span"
            display="flex"
            flexDirection="row"
            marginRight={2}
          >
            <IconButton color="inherit">
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
      </List>
      <Collapse in={isDetailsOpen.value}>
        <Box p={2}>
          <Box marginBottom={3}>
            <Typography color="textSecondary" variant="body2">
              {`Published on ${formattedPublishedAt}`}
            </Typography>
          </Box>

          <Typography component="div" color="textSecondary" variant="body2">
            <MarkdownTypography source={description} />
          </Typography>
        </Box>
      </Collapse>
    </React.Fragment>
  );
};
