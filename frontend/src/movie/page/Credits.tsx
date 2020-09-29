import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import { push } from "connected-react-router";
import * as R from "ramda";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import useBoolean from "../../common/hooks/useBoolean";
import PersonAvatar from "../../person/PersonAvatar";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import {
  MovieCredits,
  MovieCredit,
  MovieCreditCrew,
  MovieCreditCast,
} from "../../tmdb/types";

const useStyles = makeStyles((theme) => ({
  drawerBar: {
    paddingLeft: 0,
    display: "flex",
    flexDirection: "row",
    position: "sticky",

    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar,
  },
  drawerButtonIcon: {
    paddingRight: theme.spacing(1),
  },
  spinner: {
    margin: "auto",
  },

  avatar: {
    width: 98,
    height: 98,
    marginBottom: theme.spacing(1),
  },
  creditRoot: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  iconButton: {
    display: "block",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
  toolbarSpace: theme.mixins.toolbar,
}));

const shorten = (credit: string = "") =>
  R.pipe(
    (credit: string) => credit.split("/"),
    (strings) =>
      strings.length > 1 ? [...strings.slice(0, 1), "..."] : strings,
    (strings) => strings.join("/ ")
  )(credit);

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  credits: MovieCredits;
}

export default ({ credits }: Props) => {
  const { cast, crew } = credits;

  const isDrawerOpen = useBoolean(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const crewByDepartment = R.groupBy((_) => _.department || "other", crew);
  const departments = R.keys(crewByDepartment);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  const handleCreditClick = (credit: MovieCredit) => () => {
    dispatch(push(`/person/${credit.id}`));
  };

  const topCast = R.take(15, cast);
  const directors = R.filter(R.whereEq({ job: "Director" }), crew);

  return (
    <React.Fragment>
      <Box
        onClick={isDrawerOpen.setTrue}
        p={2}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography noWrap style={{ flex: 1, fontWeight: "bold" }}>
          {"Cast & Crew"}
        </Typography>
        <Box color="text.secondary">
          <UnfoldMoreIcon fontSize="small" />
        </Box>
      </Box>

      <Dialog
        fullScreen
        open={isDrawerOpen.value}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        <Box component={Paper} position="sticky" top={0} zIndex={2}>
          <HorizontalScroll p={2}>
            {departments.map((department) => (
              <Chip
                key={department}
                label={department}
                clickable
                onClick={() => setSelectedDepartment(department)}
                variant={
                  department === selectedDepartment ? "default" : "outlined"
                }
              />
            ))}
          </HorizontalScroll>
        </Box>

        <div>
          <List>
            {(crewByDepartment[selectedDepartment] || []).map((credit) => (
              <ListItem
                key={credit.creditId}
                button
                onClick={handleCreditClick(credit)}
              >
                <ListItemAvatar>
                  <Avatar src={makeTMDbImageURL(2, credit)} />
                </ListItemAvatar>
                <ListItemText primary={credit.name} secondary={credit.job} />
              </ListItem>
            ))}
          </List>
        </div>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.iconButton}
              onClick={isDrawerOpen.setFalse}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>

      <HorizontalScroll p={2} paddingTop={0}>
        {directors.map((director) => (
          <Box
            marginRight={1}
            width={120}
            key={director.creditId}
            onClick={handleCreditClick(director)}
          >
            <PersonAvatar person={director} width="100%" marginBottom={1} />
            <Typography>{director.name}</Typography>
            <Typography color="textSecondary">{director.job || ""}</Typography>
          </Box>
        ))}
        {topCast.map((castCredit) => (
          <Box
            marginRight={1}
            width={120}
            key={castCredit.creditId}
            onClick={handleCreditClick(castCredit)}
          >
            <PersonAvatar person={castCredit} width="100%" marginBottom={1} />
            <Typography>{castCredit.name}</Typography>
            <Typography color="textSecondary">
              {shorten(castCredit?.character)}
            </Typography>
          </Box>
        ))}
      </HorizontalScroll>
      <Divider />
    </React.Fragment>
  );
};
