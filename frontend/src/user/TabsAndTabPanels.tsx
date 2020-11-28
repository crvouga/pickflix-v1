import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import TabPanel from "../common/components/TabPanel";
import { UserAggergation } from "./query";
import { UserPageTabValue, useUserPageUi } from "./redux/user-page-ui";
import TabPanelList from "./TabPanelList";
import TabPanelOverview from "./TabPanelOverview";
import TabPanelReview from "./TabPanelReview";
import useReviewForm from "../review/form/review-form/useReviewForm";
import { useListener } from "../common/utility";

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

  const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    if (userPageUi.tabOrder[newIndex]) {
      userPageUi.setTabValue(userPageUi.tabOrder[newIndex]);
    }
  };

  const reviewForm = useReviewForm();
  useListener(reviewForm.eventEmitter, "submitSuccess", () => {
    userPageUi.setTabValue("reviews");
  });

  return (
    <React.Fragment>
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
      {userPageUi.tabOrder.map((tabValue, index) => (
        <TabPanel key={tabValue} value={userPageUi.tabIndex} index={index}>
          {tabValueToTabComponent(tabValue)}
        </TabPanel>
      ))}
    </React.Fragment>
  );
};
