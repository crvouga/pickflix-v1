import { Backdrop, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useModal from "../navigation/modals/useModal";
import { BOTTOM_NAVIGATION_BAR_HEIGHT } from "../navigation/NavigationBarBottom";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "fixed",
    bottom: `calc(${BOTTOM_NAVIGATION_BAR_HEIGHT}px + ${theme.spacing(2)}px)`,
    right: theme.spacing(2),
    zIndex: theme.zIndex.appBar,
  },
  backdrop: {
    zIndex: theme.zIndex.appBar - 1,
  },
}));

const useStylesFab = makeStyles((theme) => ({
  root: {
    "touch-action": "manipulation",
  },
}));

export default () => {
  const classesFab = useStylesFab();
  const classes = useStyles();
  const discoverMovieTuneModal = useModal("DiscoverMovieTune");
  const dispatch = useDispatch();

  // const open = useSelector(discoverMovieUi.selectors.speedDialOpen);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // dispatch(discoverMovieUi.actions.setSpeedDialOpen(true));
    setOpen(true);
  };
  const handleClose = () => {
    // dispatch(discoverMovieUi.actions.setSpeedDialOpen(false));
    setOpen(false);
  };

  const actions = [
    {
      icon: <SearchIcon />,
      name: "Search",
      onClick: () => {
        discoverMovieTuneModal.open();
        handleClose();
      },
    },
    // {
    //   icon: <SortIcon />,
    //   name: "Sort",
    //   onClick: () => {
    //     handleClose();
    //   },
    // },
    // {
    //   icon: <FilterListIcon />,
    //   name: "Filter",
    //   onClick: () => {
    //     handleClose();
    //   },
    // },
  ];

  const handleClickAway = () => {
    console.log("HELLO");
    handleClose();
  };

  return (
    <React.Fragment>
      <Backdrop
        className={classes.backdrop}
        open={open}
        // prevent touch users from clicking movie posters underneath
        onTouchEndCapture={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleClose();
        }}
      />

      <SpeedDial
        ariaLabel="speed dial"
        className={classes.speedDial}
        icon={<SpeedDialIcon icon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            FabProps={{
              classes: classesFab,
            }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </React.Fragment>
  );
};
