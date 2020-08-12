import { Box } from "@material-ui/core";
import React from "react";
import MediaEntity from "../common/MediaEntity";

export default ({ results = [], onResultClick = () => {} }) => {
  const handleResultClick = (result) => () => onResultClick(result);

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%">
      {results.map((result) => (
        <Box
          key={result.id}
          onClick={handleResultClick(result)}
          width="50%"
          style={{ overflowY: "hidden" }}
          p={1 / 2}
        >
          <MediaEntity entity={result} width="100%" />
        </Box>
      ))}
    </Box>
  );
};
