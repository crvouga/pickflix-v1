import { Box, List, Typography } from "@material-ui/core";
import React from "react";
import ReadMore from "../../common/components/ReadMore";
import { useMoviePageQuery } from "../data";
import * as utils from "../utils";
import DetailListItem from "./DetailListItem";

export default () => {
  const query = useMoviePageQuery();
  if (!query.data) return null;

  return (
    <List>
      <Box paddingX={2} paddingTop={2}>
        <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
        <ReadMore
          TypographyProps={{ color: "textSecondary" }}
          text={query.data.overview}
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

      {/* <Box display="flex" flexDirection="row">
        <DetailListItem
          ListItemTextProps={{
            primary: "Budget",
            secondary: utils.budget(query.data),
          }}
        />
        <DetailListItem
          ListItemTextProps={{
            primary: "Revenue",
            secondary: utils.revenue(query.data),
          }}
        />
      </Box> */}
    </List>
  );
};
