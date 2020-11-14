import {
  AppBar,
  Box,
  Chip,
  Container,
  Hidden,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import React from "react";
import { useHistory, useParams } from "react-router";
import useBoolean from "../common/hooks/useBoolean";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import BackButton from "../navigation/BackButton";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";
import AvatarUser from "../users/AvatarUser";
import { UserAggergation } from "../users/query";
import { useQueryCurrentUser } from "../users/useCurrentUser";
import DeleteListFormModal from "./DeleteListFormModal";
import EditListFormModal from "./EditListFormModal";
import { useQueryList } from "./hooks/query";
import ListCardImage from "./ListCardImage";
import ListItemsSection from "./ListItemsSection";
import { ListAggergation } from "./query";

const ListPage = ({
  currentUser,
  list,
}: {
  currentUser: UserAggergation | null;
  list: ListAggergation;
}) => {
  const history = useHistory();

  const isEditListModalOpen = useBoolean(false);
  const isDeleteListModalOpen = useBoolean(false);

  const isCurrentUser = currentUser && currentUser.user.id === list.owner.id;

  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <BackButton />
            <Typography variant="h6" noWrap>
              {list.list.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>

      <DeleteListFormModal
        listId={list.list.id}
        open={isDeleteListModalOpen.value}
        onClose={isDeleteListModalOpen.setFalse}
      />

      <EditListFormModal
        listId={list.list.id}
        open={isEditListModalOpen.value}
        onClose={isEditListModalOpen.setFalse}
      />

      <Box paddingBottom={2}>
        <Paper>
          <Container maxWidth="md" disableGutters>
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
              <Chip
                variant="outlined"
                size="medium"
                onClick={() => {
                  history.push(`/user/${list.owner.username}`);
                }}
                avatar={<AvatarUser user={list.owner} />}
                label={list.owner.username}
              />
            </Box>

            {isCurrentUser && (
              <Toolbar>
                <IconButton onClick={isEditListModalOpen.setTrue}>
                  <EditIcon />
                </IconButton>

                <IconButton onClick={isDeleteListModalOpen.setTrue}>
                  <DeleteIcon />
                </IconButton>
              </Toolbar>
            )}
          </Container>
        </Paper>
      </Box>
      <Container disableGutters maxWidth="md">
        <ListItemsSection listId={list.list.id} />
      </Container>
    </React.Fragment>
  );
};

export default () => {
  const { listId } = useParams<{ listId: string }>();

  const query = useQueryList({ listId });
  const queryCurrentUser = useQueryCurrentUser();

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data || queryCurrentUser.data === undefined) {
    return <LoadingPage />;
  }

  const list = query.data;
  const currentUser = queryCurrentUser.data;
  return <ListPage currentUser={currentUser} list={list} />;
};
