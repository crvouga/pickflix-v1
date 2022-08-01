import { AppBar, Container, makeStyles, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { TabPanel, TabPanelContainer } from "../common/components/TabPanel";
import Page from "../common/page/Page";
import { HomePageTabValue, useHomePageUi } from "./redux/home-page-ui";
import { TabPanelCurrentUser } from "./TabPanelCurrentUser";
import { TabPanelPageHistory } from "./TabPanelPageHistory";
import { TabPanelTrending } from "./TabPanelTrending";

const useStyles = makeStyles(() => ({
  appBar: {
    top: 0,
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
    const tabValue = homePageUi.tabOrder[newIndex]
    if (tabValue) {
      homePageUi.setTabValue(tabValue);
    }
  };

  return (
    <Page>
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
        <TabPanelContainer>
          {homePageUi.tabOrder.map((tabValue, index) => (
            <TabPanel key={tabValue} value={homePageUi.tabIndex} index={index}>
              {tabValueToTabComponent(tabValue)}
            </TabPanel>
          ))}
        </TabPanelContainer>
      </Container>
    </Page>
  );
};
