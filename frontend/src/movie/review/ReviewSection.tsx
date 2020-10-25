import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import AvatarCurrentUser from "../../auth/AvatarCurrentUser";
import useModal from "../../navigation/modals/useModal";
import ReviewFormModal from "../../reviews/ReviewFormModal";
import ReviewList from "../../reviews/ReviewList";
import { useMoviePageQuery } from "../data";
import Review from "./Review";

export default () => {
  const query = useMoviePageQuery();

  const reviewFormModal = useModal("ReviewForm");

  if (!query.data) {
    return null;
  }

  const { reviews, id } = query.data;

  return (
    <React.Fragment>
      <List>
        <ListItem>
          <ListItemText
            primaryTypographyProps={{
              variant: "h6",
              style: { fontWeight: "bold" },
            }}
            primary="Reviews"
          />
        </ListItem>

        <ListItem divider button onClick={reviewFormModal.open}>
          <ListItemAvatar>
            <AvatarCurrentUser />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ color: "textSecondary" }}
            primary="Add a public review..."
          />
          {/* <ListItemSecondaryAction>
            <RateReviewOutlinedIcon />
          </ListItemSecondaryAction> */}
        </ListItem>
      </List>

      <ReviewFormModal tmdbMediaId={query.data.id} tmdbMediaType="movie" />

      <ReviewList tmdbMediaId={query.data.id} tmdbMediaType="movie" />

      {reviews.results.map((review, index) => (
        <React.Fragment key={review.id}>
          <Review key={review.id} review={review} p={2} marginY={2} />
          <Divider />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
