import { Box, Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { pluralize } from "../../../common/utility";
import AutoListIcon from "../../auto-lists/AutoListIcon";
import { AutoListAggergation, toAutoListName } from "../../query";
import { ListCardImageIconWrapperBox } from "./ListCardImage";

type Props = {
  autoList: AutoListAggergation;
  onClick?: () => void;
};

export default ({ autoList, onClick }: Props) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/auto-list/${autoList.autoList.id}`);
  };
  return (
    <Card onClick={onClick || handleClick}>
      <Grid container direction="row">
        <Grid item>
          <Box p={1} width="90px">
            <ListCardImageIconWrapperBox>
              <AutoListIcon
                style={{ width: "55px", height: "55px" }}
                autoListKey={autoList.autoList.key}
              />
            </ListCardImageIconWrapperBox>
          </Box>
        </Grid>
        <Grid item zeroMinWidth xs>
          {/* NOTE: Keep in sync with ListCard.tsx */}
          <Box
            paddingX={1}
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h5" noWrap>
              {toAutoListName(autoList.autoList.key)}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" noWrap>
              {pluralize(autoList.listItemCount, "item")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};
