import {
  Box,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { partition, take, whereEq } from "ramda";
import React from "react";
import { useHistory, useParams } from "react-router";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { useMoviePageQuery } from "../data";
import CreditsListCard from "./CreditsListCard";

export default () => {
  const history = useHistory();
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();

  const query = useMoviePageQuery();
  if (!query.data) return null;

  const { credits } = query.data;

  const { cast, crew } = credits;
  const [directors, restOfCrew] = partition(whereEq({ job: "Director" }), crew);
  const topCredits = take(10, [...directors, ...cast, ...restOfCrew]);

  const handleClick = () => {
    history.push(`/movie/${tmdbMediaId}/credits`);
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
