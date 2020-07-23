import {
  AppBar,
  Avatar,
  Box,
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
import ChipSelection from "../../common/components/ChipSelection";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import useBoolean from "../../common/hooks/useBoolean";
import PersonAvatar from "../../person/PersonAvatar";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
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

const shorten = R.pipe(
  R.defaultTo(""),
  R.split("/"),
  R.when(R.pipe(R.length, R.gt(R.__, 1)), R.pipe(R.take(1), R.append("..."))),
  R.join("/ ")
);

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ credits }) => {
  const isDrawerOpen = useBoolean(false);
  const classes = useStyles();

  const { cast, crew } = credits;

  const creditsByDepartment = R.groupBy(R.prop("department"), crew);
  if (cast.length > 0) creditsByDepartment["Acting"] = cast;

  const departments = R.sortBy(R.identity, R.keys(creditsByDepartment));
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  const dispatch = useDispatch();
  const handleCreditClick = (credit) => () => {
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
        TransitionComponent={Transition}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        <Box component={Paper} position="sticky" top={0} zIndex={2}>
          <ChipSelection
            BoxProps={{
              p: 2,
            }}
            chips={departments}
            selected={selectedDepartment}
            onSelect={setSelectedDepartment}
          />
        </Box>

        <div>
          <List>
            {R.propOr([], selectedDepartment, creditsByDepartment).map(
              (credit) => (
                <ListItem
                  key={credit.creditId}
                  button
                  onClick={handleCreditClick(credit)}
                >
                  <ListItemAvatar>
                    <Avatar src={makeTMDbImageURL(2, credit)} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={credit.name}
                    secondary={credit.character || credit.job}
                  />
                </ListItem>
              )
            )}
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
        {[...directors, ...topCast].map((credit) => (
          <Box
            marginRight={1}
            minWidth={120}
            maxWidth={120}
            key={credit.creditId}
            onClick={handleCreditClick(credit)}
          >
            <PersonAvatar person={credit} width="100%" marginBottom={1} />
            <Typography>{credit.name}</Typography>
            <Typography color="textSecondary">
              {credit.job || shorten(credit.character)}
            </Typography>
          </Box>
        ))}
      </HorizontalScroll>
      <Divider />
    </React.Fragment>
  );
};
