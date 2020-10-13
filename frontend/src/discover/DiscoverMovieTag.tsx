import React from "react";
import { Chip, ChipProps, Avatar } from "@material-ui/core";
import { DiscoverMovieTag, dateRangeTagToName } from "./discover-movie-tags";
import BusinessIcon from "@material-ui/icons/Business";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { sortByValueToName } from "./query/types";

type Props = ChipProps & {
  tag: DiscoverMovieTag;
};

export default (props: Props) => {
  const { tag, ...chipProps } = props;

  switch (tag.type) {
    case "dateRange":
      return <Chip label={dateRangeTagToName(tag)} {...chipProps} />;

    case "withPeople":
      return (
        <Chip
          label={tag.name}
          avatar={<Avatar src={makeTMDbImageURL(1, tag)} />}
          {...chipProps}
        />
      );

    case "withCompanies":
      return (
        <Chip
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
      return <Chip label={tag.name} {...chipProps} />;
  }
};
