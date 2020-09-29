import { Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import AspectRatio from "../common/components/AspectRatio";
import HorizontalScroll from "../common/components/HorizontalScroll";
import Poster from "../movie/components/Poster";

export default () => {
  return (
    <div style={{ overflowY: "hidden", overflow: "hidden" }}>
      <AspectRatio ratio={[16, 9]} style={{ width: "100%" }}>
        <Box
          display="flex"
          flexDirection="column-reverse"
          paddingX={2}
          paddingY={3}
          width="100%"
        >
          <Typography variant="subtitle1">
            <Skeleton animation="wave" width="2.5em" />
          </Typography>
          <Typography variant="h5">
            <Skeleton animation="wave" width="6em" />
          </Typography>
        </Box>
      </AspectRatio>
      {[0, 1, 2].map((_, i) => (
        <React.Fragment key={i}>
          <Box paddingLeft={2} paddingBottom={1}>
            <Typography>
              <Skeleton animation="wave" variant="text" width="20%" />
            </Typography>
          </Box>
          <HorizontalScroll lock paddingLeft={2} marginBottom={2}>
            {[0, 1, 2, 3, 4, 5].map((movie, index) => (
              <Poster
                skeleton
                key={index}
                movie={{ id: String(index), title: "", posterPath: "" }}
                marginRight={2}
              />
            ))}
          </HorizontalScroll>
        </React.Fragment>
      ))}
    </div>
  );
};
