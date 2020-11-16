import { Box, Card, CardActionArea, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export default () => {
  return (
    <Card>
      <CardActionArea>
        <Grid container direction="row">
          <Grid item>
            <Box width="90px" paddingTop="100%" position="relative">
              <Box
                p={1}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
              >
                <Skeleton variant="rect" width="100%" height="100%" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs>
            <Box p={2}>
              <Skeleton variant="text" width="66.66%" height="2em" />
              <Skeleton variant="text" width="33.33%" height="2em" />
            </Box>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
