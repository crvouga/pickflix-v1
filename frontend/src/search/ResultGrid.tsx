import { Box } from "@material-ui/core";
import React from "react";
import MediaEntity from "../common/MediaEntity";
import { Result } from "./redux/types";

interface Props {
  results: Result[];
  onResultClick?: (result: Result) => void;
}

export default ({ results = [], onResultClick = () => {} }: Props) => {
  const handleResultClick = (result: Result) => () => onResultClick(result);

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%">
      {results.map((result) => (
        <Box
          key={result.id}
          onClick={handleResultClick(result)}
          width="33.33%"
          style={{ overflowY: "hidden" }}
        >
          <MediaEntity entity={result} width="100%" />
        </Box>
      ))}
    </Box>
  );
};
