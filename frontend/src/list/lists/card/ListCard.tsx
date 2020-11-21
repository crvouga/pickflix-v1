import {
  Box,
  Card,
  CardHeader,
  CardHeaderProps,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import ChipUser from "../../../user/components/ChipUser";
import { ListAggergation } from "../../query";
import ListImageBox from "./ListCardImage";

export default ({
  list,
  CardHeaderProps,
}: {
  list: ListAggergation;
  CardHeaderProps?: CardHeaderProps;
}) => {
  return (
    <Card>
      <Grid container direction="row">
        <Grid item>
          <Box p={1} width="90px">
            <ListImageBox list={list} width="100%" />
          </Box>
        </Grid>
        <Grid item zeroMinWidth xs>
          <CardHeader
            title={list.list.title}
            subheader={
              <Box display="flex" alignItems="center">
                <Box marginRight={1}>
                  <Typography variant="subtitle1" color="textSecondary" noWrap>
                    {list.listItemCount} items
                  </Typography>
                </Box>
                <Box>
                  <ChipUser
                    clickable={false}
                    onClick={() => {}}
                    size="small"
                    user={list.owner}
                  />
                </Box>
              </Box>
            }
            {...CardHeaderProps}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
