import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import CurrentUserAvatar from "../../auth/CurrentUserAvatar";
import Review from "./Review";

interface Props {
  reviews: {
    results: {
      id: string;
      url: string;
      content: string;
      author: string;
    }[];
  };
}

export default ({ reviews }: Props) => {
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
            <CurrentUserAvatar backgroundColor="none" />
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
