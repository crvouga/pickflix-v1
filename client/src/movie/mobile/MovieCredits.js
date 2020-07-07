import {
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  Dialog,
  Slide,
  AppBar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PeopleIcon from "@material-ui/icons/People";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import * as R from "ramda";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useMakeImageUrl from "../../api/useMakeImageUrl";
import ChipSelection from "../../common/ChipSelection";
import HorizontalScroll from "../../common/HorizontalScroll";
import useBoolean from "../../common/useBoolean";
import UnderPlayerDrawer from "../../video/UnderPlayerDrawer";

const useStyles = makeStyles((theme) => ({
  drawerButton: {
    textAlign: "left",
    width: "100%",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
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
  const history = useHistory();

  const { cast, crew } = credits;

  const creditsByDepartment = R.groupBy(R.prop("department"), crew);
  if (cast.length > 0) creditsByDepartment["Acting"] = cast;

  const departments = R.sortBy(R.identity, R.keys(creditsByDepartment));
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  const handleCreditClick = (credit) => () => {
    history.push(`/person/${credit.id}`);
  };

  const topCast = R.take(15, cast);
  const directors = R.filter(R.whereEq({ job: "Director" }), crew);
  const makeImageUrl = useMakeImageUrl();
  return (
    <React.Fragment>
      <ButtonBase
        component="div"
        className={classes.drawerButton}
        onClick={isDrawerOpen.setTrue}
      >
        <Typography noWrap style={{ flex: 1, fontWeight: "bold" }}>
          {"Cast & Crew"}
        </Typography>
        <Box color="text.secondary">
          <UnfoldMoreIcon fontSize="small" />
        </Box>
      </ButtonBase>

      <Dialog
        fullScreen
        open={isDrawerOpen.value}
        TransitionComponent={Transition}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        <AppBar position="sticky" color="default">
          <Toolbar className={classes.drawerBar}>
            <IconButton onClick={isDrawerOpen.setFalse}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div>
          <ChipSelection
            keys={departments}
            selectedKey={selectedDepartment}
            onChipClick={setSelectedDepartment}
          />
        </div>
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
                    <Avatar src={makeImageUrl(2, credit)} />
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
      </Dialog>

      <HorizontalScroll>
        {[...directors, ...topCast].map((credit) => (
          <ButtonBase
            component="div"
            key={credit.creditId}
            onClick={handleCreditClick(credit)}
          >
            <div className={classes.creditRoot}>
              <Avatar
                className={classes.avatar}
                src={makeImageUrl(3, credit)}
              />
              <Typography>{credit.name}</Typography>
              <Typography color="textSecondary">
                {credit.job || shorten(credit.character)}
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};
