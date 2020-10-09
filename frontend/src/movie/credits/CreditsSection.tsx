import {
  Box,
  Button,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  List,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { partition, take, whereEq } from "ramda";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { actions } from "../../redux";
import { MovieCredits } from "../../tmdb/types";
import CreditsListCard from "./CreditsListCard";
import { useMoviePageQuery } from "../data";

export default () => {
  const dispatch = useDispatch();
  const { movieId } = useParams<{ movieId: string }>();

  const query = useMoviePageQuery();
  if (!query.data) return null;

  const { credits } = query.data;

  const { cast, crew } = credits;
  const [directors, restOfCrew] = partition(whereEq({ job: "Director" }), crew);
  const topCredits = take(10, [...directors, ...cast, ...restOfCrew]);

  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/movie/${movieId}/credits` }));
  };

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText
          primaryTypographyProps={{
            variant: "h6",
            style: { fontWeight: "bold" },
          }}
          primary="Cast & Crew"
        />
        <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
          <Button>See All</Button>
        </ListItemSecondaryAction>
      </ListItem>
      <HorizontalScroll paddingLeft={2}>
        {topCredits.map((credit) => (
          <Box width="150px" key={credit.creditId} marginRight={1}>
            <CreditsListCard credit={credit} />
          </Box>
        ))}

        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={handleClick}
        >
          See All
        </Button>
        <Box height="100%" width="auto" marginRight={2} />
      </HorizontalScroll>
    </List>
  );
};
