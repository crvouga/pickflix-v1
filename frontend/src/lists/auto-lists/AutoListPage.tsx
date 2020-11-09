import {
  AppBar,
  Box,
  Container,
  Hidden,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import BackButton from "../../navigation/BackButton";
import ResponsiveNavigation from "../../navigation/ResponsiveNavigation";
import ChipUser from "../../users/ChipUser";
import { User } from "../../users/query";
import ListItemsSection from "../ListItemsSection";
import {
  queryKeys,
  AutoListAggergation,
  toAutoListName,
  getAutoList,
} from "../query";
import AutoListIcon from "./AutoListIcon";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import ErrorPage from "../../common/page/ErrorPage";
import LoadingPage from "../../common/page/LoadingPage";

const AutoListPage = ({ autoList }: { autoList: AutoListAggergation }) => {
  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <Hidden smUp>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <BackButton />
            <Typography variant="h6" noWrap>
              {toAutoListName(autoList.list.key)}
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>

      <Box paddingBottom={2}>
        <Paper>
          <Container maxWidth="md">
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
                <ChipUser user={autoList.owner} />
              </Box>
            </Box>
          </Container>
        </Paper>
      </Box>
      <Container disableGutters maxWidth="md">
        <ListItemsSection listId={autoList.list.id} />
      </Container>
    </React.Fragment>
  );
};

export default () => {
  const { autoListId } = useParams<{ autoListId: string }>();

  const query = useQuery(queryKeys.autoList({ autoListId }), () =>
    getAutoList({ autoListId })
  );

  if (query.error) {
    return <ErrorPage />;
  }

  if (!query.data) {
    return <LoadingPage />;
  }

  const autoList = query.data;

  return <AutoListPage autoList={autoList} />;
};
