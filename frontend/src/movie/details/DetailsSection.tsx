import { Box, List, Typography } from "@material-ui/core";
import React from "react";
import ReadMore from "../../common/components/ReadMore";
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
    <List>
      <Box paddingX={2} paddingTop={2}>
        <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
        <ReadMore
          TypographyProps={{ color: "textSecondary" }}
          text={props.details.overview}
        />
      </Box>
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
    </List>
  );
};
