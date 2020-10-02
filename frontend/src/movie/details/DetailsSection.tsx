import { Box, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import {
  MovieDetails,
  MovieKeywords,
  MovieReleaseDates,
} from "../../tmdb/types";
import * as utils from "../utils";
import DetailListItem from "./DetailListItem";

type Props = {
  details: MovieDetails;
  keywords: MovieKeywords;
  releaseDates: MovieReleaseDates;
};

export default (props: Props) => {
  return (
    <React.Fragment>
      <DetailListItem
        ListItemTextProps={{
          primaryTypographyProps: {
            variant: "h6",
            style: {
              fontWeight: "bold",
            },
          },
          primary: "Overview",
          secondary: props.details.overview.substring(0, 180) + "...",
        }}
      />
      {/* <Box display="flex" flexDirection="row">
        <DetailListItem
          ListItemTextProps={{
            primary: "Runtime",
            secondary: utils.runtime(props),
          }}
        />
        <DetailListItem
          ListItemTextProps={{
            primary: "Year",
            secondary: utils.releaseYear(props),
          }}
        />
        <DetailListItem
          ListItemTextProps={{
            primary: "Rated",
            secondary: utils.rated(props),
          }}
        />
      </Box> */}

      <Box display="flex" flexDirection="row">
        <DetailListItem
          ListItemTextProps={{
            primary: "Budget",
            secondary: utils.budget(props),
          }}
        />
        <DetailListItem
          ListItemTextProps={{
            primary: "Revenue",
            secondary: utils.revenue(props),
          }}
        />
      </Box>
    </React.Fragment>
  );
};
