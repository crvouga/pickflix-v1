import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CheckIcon from "@material-ui/icons/Check";
import MovieIcon from "@material-ui/icons/Movie";
import { AvatarGroup } from "@material-ui/lab";
import * as R from "ramda";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressBox from "../common/components/CircularProgressBox";
import { actions, selectors } from "../redux";
import { ModalName } from "../redux/router/types";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import * as queryConfigs from "./redux/query-configs";

const listsQueryConfig = queryConfigs.listsRequest();

const Transition = (props: TransitionProps) => (
  <Slide direction="up" {...props} />
);

const useStyles = makeStyles((theme) => ({
  doneButton: {
    position: "fixed",
    top: "auto",
    bottom: "0",
    left: "0",
    width: "100%",
    zIndex: 2,
    textAlign: "left",
    padding: theme.spacing(2),
    borderTop: `solid 1px ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isOpen = useSelector(selectors.router.isOpen(ModalName.SaveToList));
  const modalProps = useSelector(selectors.router.props(ModalName.SaveToList));

  const listsQuery = useSelector(selectors.query.queryState(listsQueryConfig));
  const lists = useSelector(selectors.lists.lists);

  const onClose = () => {
    dispatch(actions.router.close({ name: ModalName.SaveToList }));
  };

  const onClickCreateList = () => {
    if (tmdbMediaId) {
      dispatch(actions.router.close({ name: ModalName.SaveToList }));
      dispatch(
        actions.router.open({
          name: ModalName.CreateList,
          props: {
            listItemInfos: [
              {
                tmdbMediaType: "movie",
                tmdbMediaId,
              },
            ],
          },
        })
      );
    }
  };

  const tmdbMediaId = modalProps.movieId;

  const handleSaveToList = (listId: string) => async () => {
    if (tmdbMediaId) {
      dispatch(
        actions.lists.addListItem({
          listId,
          tmdbMediaType: "movie",
          tmdbMediaId,
        })
      );
      dispatch(actions.router.close({ name: ModalName.SaveToList }));
    }
  };

  const handleDone = () => {
    dispatch(actions.router.close({ name: ModalName.SaveToList }));
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(actions.query.requestAsync(listsQueryConfig));
    }
  }, [isOpen]);

  return (
    <Dialog
      // TransitionComponent={Transition}
      fullScreen
      open={isOpen}
      onClose={onClose}
    >
      <ListItem divider>
        <ListItemText primary="Save to..." />
        <Button onClick={onClickCreateList} color="primary">
          Create New
        </Button>
      </ListItem>

      <List>
        {lists.map((list, index) => (
          <ListItem
            key={list?.id || index}
            divider
            button
            onClick={handleSaveToList(list?.id)}
          >
            <Box marginX={1}>
              <AvatarGroup spacing="small">
                {R.take(1, list.listItems || []).map((listItem, index) => (
                  <Avatar
                    key={listItem?.id || index}
                    variant="square"
                    src={makeTMDbImageURL(3, {
                      posterPath: listItem?.tmdbData.posterPath,
                    })}
                  >
                    <MovieIcon />
                  </Avatar>
                ))}
              </AvatarGroup>
            </Box>
            {/* <ListItemIcon>
                  <Checkbox checked={isChecked(list.id)} />
                </ListItemIcon> */}
            <ListItemText
              primary={list.title}
              secondary={`${list?.listItemCount || 0} items`}
            />
          </ListItem>
        ))}
      </List>

      {listsQuery.isPending && <CircularProgressBox />}

      <ButtonBase onClick={handleDone} className={classes.doneButton}>
        <ListItem>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary="Done" />
        </ListItem>
      </ButtonBase>
    </Dialog>
  );
};
