import { Box, Typography } from "@material-ui/core";
import React from "react";
import { pluralize } from "../../common/utility";
import WithAuthentication from "../../user/auth/WithAuthentication";
import ChipUser from "../../user/components/ChipUser";
import { ListAggergation } from "../query";
import ListCardImage from "./card/ListCardImage";
import ListActionBar from "./ListActionBar";

export default ({ list }: { list: ListAggergation }) => {
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
          <Typography variant="subtitle1" align="center">
            {pluralize(list.listItemCount, "item")}
          </Typography>
        </Box>
        <ChipUser user={list.owner} />
      </Box>
      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          currentUser.user.id === list.owner.id && (
            <ListActionBar list={list.list} />
          )
        }
      />
    </React.Fragment>
  );
};
