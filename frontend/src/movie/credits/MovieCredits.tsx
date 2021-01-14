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
import useModal from "../../app/modals/useModal";
import HorizontalSnapScroll from "../../common/components/HorizontalSnapScroll";
import { MovieCredits } from "../../media/tmdb/types";
import CreditsDialog from "./CreditsDialog";
import CreditsListCard from "./CreditsListCard";

export default ({ credits }: { credits: MovieCredits }) => {
  const { cast, crew } = credits;
  const [directors, restOfCrew] = partition(whereEq({ job: "Director" }), crew);
  const topCredits = take(10, [...directors, ...cast, ...restOfCrew]);

  const { isOpen, open, close } = useModal("MovieCredits");

  return (
    <React.Fragment>
      <CreditsDialog credits={credits} open={isOpen} onClose={close} />
      <List disablePadding>
        <ListItem
          button
          onClick={() => {
            open();
          }}
        >
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
      </List>
      <HorizontalSnapScroll>
        {topCredits.map((credit) => (
          <Box width="150px" key={credit.creditId} marginLeft={1 + 1 / 2}>
            <CreditsListCard credit={credit} />
          </Box>
        ))}

        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => {
            open();
          }}
        >
          See All
        </Button>
        <Box height="100%" width="auto" marginRight={2} />
      </HorizontalSnapScroll>
    </React.Fragment>
  );
};
