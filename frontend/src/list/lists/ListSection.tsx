import { Box, Typography } from "@material-ui/core";
import React from "react";
import { pluralize } from "../../common/utility";
import WithAuthentication from "../../user/auth/WithAuthentication";
import ChipUser from "../../user/components/ChipUser";
import RemoveListItemFormModal from "../forms/remove-list-items-form/RemoveListItemFormModal";
import { ListAggergation, isEditorOrOwner } from "../query";
import ListCardImage from "./card/ListCardImage";
import ListActionBar from "./ListActionBar";

export default ({ list }: { list: ListAggergation }) => {
  return (
    <React.Fragment>
      <RemoveListItemFormModal />
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
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          paddingX={2}
        >
          <Box marginRight={1} marginBottom={1}>
            <ChipUser user={list.owner} />
          </Box>
          {list.editors.map((editor) => (
            <Box key={editor.id} marginRight={1} marginBottom={1}>
              <ChipUser user={editor} />
            </Box>
          ))}
        </Box>
      </Box>
      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          isEditorOrOwner(currentUser.user, list) && (
            <ListActionBar currentUser={currentUser} list={list} />
          )
        }
      />
    </React.Fragment>
  );
};
