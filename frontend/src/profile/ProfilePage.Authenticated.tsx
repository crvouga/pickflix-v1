import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Container,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { User } from "../auth/query";
import ListList from "../lists/ListList";
import useModal from "../navigation/modals/useModal";
import NavigationDesktop from "../navigation/Navigation.Desktop";
import NavigationMobile from "../navigation/Navigation.Mobile";
import ResponsiveNavigation from "../navigation/ResponsiveNavigation";

const CreateNewListListItem = () => {
  const theme = useTheme();
  const addListModal = useModal("AddList");
  const handleClick = () => {
    addListModal.open();
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: "transparent" }}>
          <AddIcon style={{ color: theme.palette.primary.main }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        style={{ color: theme.palette.primary.main }}
        primary="Create New List"
      />
    </ListItem>
  );
};

type Props = {
  currentUser: User;
};

export default ({ currentUser }: Props) => {
  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <Typography variant="h6">{currentUser.username}</Typography>
          </Toolbar>
        </AppBar>
      </Hidden>

      <Container maxWidth="md">
        <List>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{ variant: "h6" }}
              primary="Lists"
            />
          </ListItem>
          <CreateNewListListItem />

          <ListList />
        </List>
      </Container>
    </React.Fragment>
  );
};
