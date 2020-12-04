import { Box, Chip } from "@material-ui/core";
import React from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import { SearchFilter, toSearchFilterName } from "../query";

type Props = {
  onClick: (filter: SearchFilter) => void;
  filter?: SearchFilter;
};

export default (props: Props) => {
  return (
    <React.Fragment>
      <HorizontalScroll paddingLeft={2} paddingBottom={1}>
        {Object.values(SearchFilter).map((filter) => (
          <Box key={filter} marginRight={1}>
            <Chip
              variant={filter === props.filter ? "default" : "outlined"}
              label={toSearchFilterName(filter)}
              onClick={() => props.onClick(filter)}
            />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};
