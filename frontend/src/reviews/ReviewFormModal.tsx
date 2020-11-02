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
  Slide,
  TextField,
  Toolbar,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import MovieIcon from "@material-ui/icons/Movie";
import SendIcon from "@material-ui/icons/Send";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import ErrorBox from "../common/components/ErrorBox";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import { useQueryMovie } from "../movie/query";
import * as movieUtils from "../movie/utils";
import useModal from "../navigation/modals/useModal";
import { useMakeImageUrl } from "../tmdb/makeTMDbImageURL";
import { TmdbMediaType } from "../tmdb/types";
import useReviewForm from "./hooks/useReviewForm";

const Transition = (props: TransitionProps) => {
  return <Slide direction="up" {...props} />;
};

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
}));

type Props = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

const MediaInfo = (props: Props) => {
  const makeImageUrl = useMakeImageUrl();
  const queryMovie = useQueryMovie(props);

  if (queryMovie.error) {
    return <ErrorBox />;
  }

  if (!queryMovie.data) {
    return (
      <List>
        <ListItemSkeleton />
      </List>
    );
  }

  const movie = queryMovie.data;
  const subtitle = [
    movieUtils.releaseYear(movie),
    movieUtils.toCertification(movie),
    // movieUtils.runtime(movie),
  ].join(` ${movieUtils.SMALL_DOT} `);

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar variant="square" src={makeImageUrl(2, movie)}>
            <MovieIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={movie.title} secondary={subtitle} />
      </ListItem>
    </List>
  );
};

export default (props: Props) => {
  const { tmdbMediaId, tmdbMediaType } = props;

  const classesDialog = useStylesDialog();
  const reviewFormModal = useModal("ReviewForm");
  const reviewForm = useReviewForm({ tmdbMediaId, tmdbMediaType });

  const refContent = useRef<HTMLInputElement>();

  const [disabled, setDisabled] = useState(true);
  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setDisabled(e.target.value.length === 0);
  };

  const handleFocus = () => {
    if (refContent.current) {
      refContent.current.focus();
    }
  };

  const history = useHistory();
  const handleClose = async () => {
    history.goBack();
    // reviewFormModal.close();
  };

  const handleSubmit = async () => {
    const content = refContent.current?.value || "";

    try {
      await reviewForm.submit({ content });
      reviewFormModal.close();
    } catch (error) {}
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen
      classes={classesDialog}
      open={reviewFormModal.isOpen}
      onClose={reviewFormModal.close}
    >
      <AppBar color="default" position="sticky">
        <Toolbar>
          <IconButton onClick={handleClose} edge="start">
            <CloseIcon />
          </IconButton>
          <Box flex={1} />
          <IconButton disabled={disabled} onClick={handleSubmit} edge="end">
            <SendIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MediaInfo tmdbMediaId={tmdbMediaId} tmdbMediaType={tmdbMediaType} />

      <Divider />

      {/* <Box p={2} display="flex" flexDirection="row">
        <Typography variant="h6">{rating || "-"}</Typography>
        <Typography variant="subtitle2">/{MAX_RATING}</Typography>
        <Rating onChange={handleChangeRating} value={rating} max={MAX_RATING} />
      </Box>

      <Divider />
       */}

      <Box p={2}>
        <TextField
          variant="outlined"
          style={{ fontWeight: "bold", fontSize: "1.25em" }}
          fullWidth
          multiline
          rows={6}
          rowsMax={6}
          inputRef={refContent}
          placeholder="Write your review here"
          onChange={handleChange}
        />
      </Box>
    </Dialog>
  );
};
