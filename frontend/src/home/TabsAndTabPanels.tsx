import { AppBar, Container, Tab, Tabs, makeStyles } from "@material-ui/core";
import React from "react";
import TabPanel from "../common/components/TabPanel";
import { HomePageTabValue, useHomePageUi } from "./redux/home-page-ui";
import { TabPanelPageHistory } from "./TabPanelPageHistory";
import { TabPanelTrending } from "./TabPanelTrending";
import { TabPanelCurrentUser } from "./TabPanelCurrentUser";
import { APP_BAR_HEIGHT } from "../app/navigation/constants";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      top: APP_BAR_HEIGHT,
    },
  },
}));

export default () => {
  const classes = useStyles();

  const homePageUi = useHomePageUi();

  const tabValueToTabComponent = (tabValue: HomePageTabValue) => {
    switch (tabValue) {
      case "Trending":
        return <TabPanelTrending />;
      case "From Lists":
        return <TabPanelCurrentUser />;
      case "Recent":
        return <TabPanelPageHistory />;
    }
  };

  const handleChange = (_1: React.ChangeEvent<{}>, newIndex: number) => {
    if (homePageUi.tabOrder[newIndex]) {
      homePageUi.setTabValue(homePageUi.tabOrder[newIndex]);
    }
  };

  return (
    <React.Fragment>
      <AppBar color="default" position="sticky" className={classes.appBar}>
        <Container maxWidth="md">
          <Tabs
            value={homePageUi.tabIndex}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={handleChange}
          >
            {homePageUi.tabOrder.map((tabValue) => (
              <Tab key={tabValue} label={tabValue} />
            ))}
          </Tabs>
        </Container>
      </AppBar>
      <Container maxWidth="md" disableGutters>
        {homePageUi.tabOrder.map((tabValue, index) => (
          <TabPanel key={tabValue} value={homePageUi.tabIndex} index={index}>
            {tabValueToTabComponent(tabValue)}
          </TabPanel>
        ))}
      </Container>
    </React.Fragment>
  );
};
