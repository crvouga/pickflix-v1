import { Box, Card, CardActionArea, Grid, Typography } from "@material-ui/core";
import React from "react";
import { AutoListAggergation, toAutoListName } from "../query";
import AutoListIcon from "./AutoListIcon";

type Props = {
  autoList: AutoListAggergation;
};

export default ({ autoList }: Props) => {
  return (
    <Card>
      <CardActionArea>
        <Grid container direction="row">
          <Grid item>
            <Box
              width="100px"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <AutoListIcon
                style={{ width: "50px", height: "50px" }}
                autoListKey={autoList.list.key}
              />
            </Box>
          </Grid>
          <Grid item zeroMinWidth xs>
            <Box p={2}>
              <Typography variant="h6" noWrap>
                {toAutoListName(autoList.list.key)}
              </Typography>
              <Box display="flex" alignItems="center">
                <Box marginRight={1}>
                  <Typography variant="subtitle1" color="textSecondary" noWrap>
                    {autoList.listItemCount} items
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
