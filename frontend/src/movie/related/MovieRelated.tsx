import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import useModal from "../../app/modals/useModal";
import { MoviePosterScrollInfinite } from "../components/MoviePosterScroll";
import { getMovieRecommendations } from "../query";
import MovieRelatedDialog from "./MovieRelatedDialog";

export default ({ tmdbMediaId }: { tmdbMediaId: string }) => {
  const { isOpen, open, close } = useModal("MovieRelated");

  return (
    <React.Fragment>
      <MovieRelatedDialog
        tmdbMediaId={tmdbMediaId}
        open={isOpen}
        onClose={close}
      />
      <List disablePadding>
        <ListItem
          button
          onClick={() => {
            open();
          }}
        >
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            primary="People Also Liked"
          />
          <ListItemSecondaryAction>
            <Button
              onClick={() => {
                open();
              }}
            >
              See All
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <MoviePosterScrollInfinite
        queryKey={["movies", "related", tmdbMediaId]}
        queryFn={({ page }) => getMovieRecommendations({ tmdbMediaId, page })}
      />
    </React.Fragment>
  );
};
