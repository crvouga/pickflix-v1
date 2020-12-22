import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import React from "react";
import TabPanel from "../common/components/TabPanel";
import { HomePageTabValue, useHomePageUi } from "./redux/home-page-ui";
import { TabPanelPageHistory } from "./TabPanelPageHistory";
import { TabPanelTrending } from "./TabPanelTrending";
import { TabPanelCurrentUser } from "./TabPanelCurrentUser";

export default () => {
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

  const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    if (homePageUi.tabOrder[newIndex]) {
      homePageUi.setTabValue(homePageUi.tabOrder[newIndex]);
    }
  };

  return (
    <React.Fragment>
      <AppBar color="default" position="sticky" style={{ top: 0 }}>
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
