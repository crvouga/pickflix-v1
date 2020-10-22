import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import CurrentUserAvatar from "../../auth/CurrentUserAvatar";
import { useMoviePageQuery } from "../data";
import Review from "./Review";

export default () => {
  const query = useMoviePageQuery();
  if (!query.data) return null;

  const { reviews } = query.data;

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

        <ListItem divider button>
          <ListItemAvatar>
            <CurrentUserAvatar />
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
      {reviews.results.map((review, index) => (
        <React.Fragment key={review.id}>
          <Review key={review.id} review={review} p={2} marginY={2} />
          <Divider />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
