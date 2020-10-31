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
import HorizontalScroll from "../common/components/HorizontalScroll";
import { MovieCredits } from "../tmdb/types";
import CreditsListCard from "./credits/CreditsListCard";

export default ({ credits }: { credits: MovieCredits }) => {
  const { cast, crew } = credits;
  const [directors, restOfCrew] = partition(whereEq({ job: "Director" }), crew);

  const topCredits = take(10, [...directors, ...cast, ...restOfCrew]);

  return (
    <List>
      <ListItem button>
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

        <Button variant="outlined" endIcon={<ArrowForwardIcon />}>
          See All
        </Button>
        <Box height="100%" width="auto" marginRight={2} />
      </HorizontalScroll>
    </List>
  );
};
