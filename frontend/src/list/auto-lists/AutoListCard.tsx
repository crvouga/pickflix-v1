import { Box, Card, CardActionArea, Grid, Typography } from "@material-ui/core";
import React from "react";
import { AutoListAggergation, toAutoListName } from "../query";
import AutoListIcon from "./AutoListIcon";
import { useHistory } from "react-router";

type Props = {
  autoList: AutoListAggergation;
  onClick?: () => void;
};

export default ({ autoList, onClick }: Props) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/auto-list/${autoList.list.id}`);
  };
  return (
    <Card onClick={onClick || handleClick}>
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
              style={{ width: "55px", height: "55px" }}
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
    </Card>
  );
};
