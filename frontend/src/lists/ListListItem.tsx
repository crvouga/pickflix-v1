import { Box, ButtonBase, Typography, Chip } from "@material-ui/core";
import React from "react";
import AvatarUser from "../auth/AvatarUser";
import ListImageBox from "./ListImageBox";
import { ListAggergation } from "./query/types";

export default ({ list }: { list: ListAggergation }) => {
  return (
    <ButtonBase style={{ width: "100%" }}>
      <Box display="flex" width="100%">
        <Box width="100px">
          <ListImageBox list={list} width="100%" />
        </Box>
        <Box
          paddingLeft={2}
          textAlign="left"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Typography variant="h5">{list.list.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {list.listItemCount} items
          </Typography>
          <Box>
            <Chip
              size="small"
              variant="outlined"
              avatar={<AvatarUser user={list.owner} />}
              label={list.owner.username}
            />
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  );
};
