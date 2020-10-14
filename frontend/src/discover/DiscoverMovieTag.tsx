import { Avatar, Chip, ChipProps, makeStyles } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import React from "react";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { dateRangeTagToName, DiscoverMovieTag } from "./discover-movie-tags";
import { capitalizeWords } from "../utils";

type Props = ChipProps & {
  tag: DiscoverMovieTag;
};

const useStylesChip = makeStyles((theme) => ({
  root: {
    fontSize: "1.25em",
    fontWeight: "bold",
  },
}));

export default (props: Props) => {
  const classesChip = useStylesChip();

  const { tag, ...chipProps } = props;

  switch (tag.type) {
    case "dateRange":
      return (
        <Chip
          classes={classesChip}
          label={dateRangeTagToName(tag)}
          {...chipProps}
        />
      );

    case "withPeople":
      return (
        <Chip
          classes={classesChip}
          label={tag.name}
          avatar={<Avatar src={makeTMDbImageURL(1, tag)} />}
          {...chipProps}
        />
      );

    case "withCompanies":
      return (
        <Chip
          classes={classesChip}
          label={tag.name}
          avatar={
            <Avatar variant="square" src={makeTMDbImageURL(1, tag)}>
              <BusinessIcon />
            </Avatar>
          }
          {...chipProps}
        />
      );

    default:
      return (
        <Chip
          classes={classesChip}
          label={capitalizeWords(tag.name)}
          {...chipProps}
        />
      );
  }
};
