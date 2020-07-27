import { Box, Chip, Typography } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import discover from "../../discover/redux/discover";
import { useDispatch } from "react-redux";

export default ({ keywords }) => {
  const dispatch = useDispatch();
  const handleKeywordClick = (keyword) => () => {
    dispatch(
      discover.actions.setInput({
        options: [R.assoc("type", "keyword", keyword)],
      })
    );
  };

  return (
    <React.Fragment>
      <Box paddingLeft={2} paddingBottom={1}>
        <Typography style={{ fontWeight: "bold" }}>Keywords</Typography>
      </Box>
      <Box paddingX={2} paddingBottom={1}>
        {keywords.map((keyword) => (
          <Box key={keyword.id} marginRight={1}>
            <Chip
              label={keyword.name}
              onClick={handleKeywordClick(keyword)}
              clickable
              variant="outlined"
            />
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
};
