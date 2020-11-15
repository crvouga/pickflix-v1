import { Box, Card, CardActionArea, Grid, Typography } from "@material-ui/core";
import React from "react";
import ChipUser from "../users/ChipUser";
import ListImageBox, { ListImageBoxSkeleton } from "./ListCardImage";
import { ListAggergation } from "./query/types";
import { Skeleton } from "@material-ui/lab";

export const ListCardSkeleton = () => {
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

export default ({ list }: { list: ListAggergation }) => {
  return (
    <Card>
      <CardActionArea>
        <Grid container direction="row">
          <Grid item>
            <Box p={1} width="90px">
              <ListImageBox list={list} width="100%" />
            </Box>
          </Grid>
          <Grid item zeroMinWidth xs>
            <Box p={2}>
              <Typography variant="h6" noWrap>
                {list.list.title}
              </Typography>
              <Box display="flex" alignItems="center">
                <Box marginRight={1}>
                  <Typography variant="subtitle1" color="textSecondary" noWrap>
                    {list.listItemCount} items
                  </Typography>
                </Box>
                <Box>
                  <ChipUser noLink size="small" user={list.owner} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
