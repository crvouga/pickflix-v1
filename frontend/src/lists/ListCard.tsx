import {
  Box,
  ButtonBase,
  Typography,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from "@material-ui/core";
import React from "react";
import AvatarUser from "../users/AvatarUser";
import ListImageBox from "./ListCardImage";
import { ListAggergation } from "./query/types";
import ChipUser from "../users/ChipUser";

export default ({ list }: { list: ListAggergation }) => {
  return (
    <Card>
      <CardActionArea>
        <Grid container direction="row">
          <Grid item>
            <Box width="100px">
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
