import { Box, Typography } from "@material-ui/core";
import React from "react";
import ChipUser from "../../users/components/ChipUser";
import { pluralize } from "../../utils";
import { AutoListAggergation, toAutoListName } from "../query";
import AutoListIcon from "./AutoListIcon";

export default ({ autoList }: { autoList: AutoListAggergation }) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Box
        width="150px"
        paddingBottom={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <AutoListIcon
          style={{ width: "65px", height: "65px" }}
          autoListKey={autoList.list.key}
        />
      </Box>
      <Box paddingBottom={1}>
        <Typography variant="h5" style={{ wordBreak: "break-all" }}>
          {toAutoListName(autoList.list.key)}
        </Typography>
      </Box>
      <Box paddingBottom={1}>
        <Typography variant="subtitle1">
          {pluralize(autoList.listItemCount, "item")}
        </Typography>
      </Box>
      <Box paddingBottom={1}>
        <ChipUser user={autoList.owner} />
      </Box>
    </Box>
  );
};
