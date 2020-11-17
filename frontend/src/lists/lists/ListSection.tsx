import { Box, Typography } from "@material-ui/core";
import React from "react";
import ChipUser from "../../users/ChipUser";
import { UserAggergation } from "../../users/query";
import ListCardImage from "./card/ListCardImage";
import { ListAggergation } from "../query";
import ListActionBar from "./ListActionBar";

export default ({
  currentUser,
  list,
}: {
  currentUser: UserAggergation | null;
  list: ListAggergation;
}) => {
  const isCurrentUser = currentUser && currentUser.user.id === list.owner.id;

  return (
    <React.Fragment>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <Box width="150px" paddingBottom={1}>
          <ListCardImage list={list} />
        </Box>
        <Box paddingBottom={1}>
          <Typography
            variant="h5"
            align="center"
            style={{ wordBreak: "break-all" }}
          >
            {list.list.title}
          </Typography>
          <Typography variant="body1" align="center">
            {list.list.description}
          </Typography>
        </Box>
        <ChipUser user={list.owner} />
      </Box>
      {isCurrentUser && <ListActionBar listId={list.list.id} />}
    </React.Fragment>
  );
};
