import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { APP_BAR_HEIGHT } from "../app/navigation/constants";
import { TabPanel, TabPanelContainer } from "../common/components/TabPanel";
import { useListener } from "../common/utility";
import { eventEmitterReviewForm } from "../review/form/edit-create-review/review-form";
import { UserAggergation } from "./query";
import { UserPageTabValue, useUserPageUi } from "./redux/user-page-ui";
import TabPanelList from "./TabPanelList";
import TabPanelOverview from "./TabPanelOverview";
import TabPanelReview from "./TabPanelReview";

const tabValueToLabel = (tabValue: UserPageTabValue): string => {
  switch (tabValue) {
    case "lists":
      return "Lists";
    case "overview":
      return "Overview";
    case "reviews":
      return "Reviews";
  }
};

export default ({ user }: { user: UserAggergation }) => {
  const userPageUi = useUserPageUi();

  const tabValueToTabComponent = (tabValue: UserPageTabValue) => {
    switch (tabValue) {
      case "lists":
        return <TabPanelList user={user} />;
      case "overview":
        return <TabPanelOverview user={user} />;
      case "reviews":
        return <TabPanelReview user={user} />;
    }
  };

  const handleChange = (_1: React.ChangeEvent<{}>, newIndex: number) => {
    const tabValue = userPageUi.tabOrder[newIndex]
    if (tabValue) {
      userPageUi.setTabValue(tabValue);
    }
  };

  useListener(eventEmitterReviewForm, "submitSuccess", () => {
    userPageUi.setTabValue("reviews");
  });

  return (
    <React.Fragment>
      <AppBar color="default" position="sticky" style={{ top: APP_BAR_HEIGHT }}>
        <Container maxWidth="md">
          <Tabs
            value={userPageUi.tabIndex}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={handleChange}
          >
            {userPageUi.tabOrder.map((tabValue) => (
              <Tab key={tabValue} label={tabValueToLabel(tabValue)} />
            ))}
          </Tabs>
        </Container>
      </AppBar>
      <Container maxWidth="md" disableGutters>
        <TabPanelContainer>
          {userPageUi.tabOrder.map((tabValue, index) => (
            <TabPanel key={tabValue} value={userPageUi.tabIndex} index={index}>
              {tabValueToTabComponent(tabValue)}
            </TabPanel>
          ))}
        </TabPanelContainer>
      </Container>
    </React.Fragment>
  );
};
