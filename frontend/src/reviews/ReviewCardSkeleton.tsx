import { Box, Card, CardActions, CardContent } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import ListItemSkeleton from "../common/components/ListItemSkeleton";

type Props = {
  showUser?: boolean;
  showMedia?: boolean;
  iconButtonCount?: number;
};

const ICON_BUTTON_DIAMETER = "32px";

const IconButtonSkeleton = () => {
  return (
    <Box p={1}>
      <Skeleton
        variant="circle"
        width={ICON_BUTTON_DIAMETER}
        height={ICON_BUTTON_DIAMETER}
      />
    </Box>
  );
};

export default ({
  showUser = false,
  showMedia = false,
  iconButtonCount = 0,
}: Props) => {
  return (
    <Card>
      {showMedia && <ListItemSkeleton avatarShape="rect" />}
      {showUser && <ListItemSkeleton />}
      <CardContent>
        <Box display="flex" alignItems="center" paddingBottom={1}>
          <Skeleton variant="rect" width="8em" height="1em" />
        </Box>

        <Box width="100%" maxWidth="240px">
          <Skeleton variant="text" width="100%" height="3em" />
        </Box>
      </CardContent>
      <CardActions>
        {[...Array(iconButtonCount)].map((_, index) => (
          <IconButtonSkeleton key={index} />
        ))}
      </CardActions>
    </Card>
  );
};
