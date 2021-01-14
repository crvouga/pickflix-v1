import { Box, Divider, Paper, Tab, Tabs } from "@material-ui/core";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import React from "react";
import useModal from "../../../app/modals/useModal";
import { AppBarGutter } from "../../../common/components/AppBarGutter";
import {
  ResponsiveDialog,
  RESPONSIVE_DIALOG_MAX_WIDTH,
} from "../../../common/components/ResponsiveDialog";
import TabPabel from "../../../common/components/TabPanel";
import {
  DiscoverTagsTabValue,
  useDiscoverPageUi,
} from "../../redux/discover-page-ui";
import { DiscoverTagsHistoryForm } from "./DiscoverTagsHistory";
import { DiscoverTagsSavedForm } from "./DiscoverTagsSavedForm";

export const DiscoverTagsFormModal = () => {
  const { isOpen, close } = useModal("DiscoverTagsForm");

  const discoverPageUi = useDiscoverPageUi();

  const renderTab = (tabValue: DiscoverTagsTabValue) => {
    switch (tabValue) {
      case "Saved":
        return <Tab key={tabValue} icon={<SaveOutlinedIcon />} />;
      case "History":
        return <Tab key={tabValue} icon={<HistoryOutlinedIcon />} />;
    }
  };

  const renderTabPanel = (tabValue: DiscoverTagsTabValue) => {
    switch (tabValue) {
      case "Saved":
        return <DiscoverTagsSavedForm />;
      case "History":
        return <DiscoverTagsHistoryForm />;
    }
  };

  const currentIndex = discoverPageUi.discoverTagsTabOrder.indexOf(
    discoverPageUi.discoverTagsTabValue
  );

  const handleChange = (_1: React.ChangeEvent<{}>, newIndex: number) => {
    if (discoverPageUi.discoverTagsTabOrder[newIndex]) {
      discoverPageUi.setDiscoverTagsTabValue(
        discoverPageUi.discoverTagsTabOrder[newIndex]
      );
    }
  };

  return (
    <ResponsiveDialog open={isOpen} onClose={close} showDoneButton>
      <Box
        component={Paper}
        zIndex={2}
        position="fixed"
        width="100%"
        maxWidth={RESPONSIVE_DIALOG_MAX_WIDTH}
      >
        <Tabs
          value={currentIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {discoverPageUi.discoverTagsTabOrder.map(renderTab)}
        </Tabs>
        <Divider />
      </Box>

      <AppBarGutter />

      {discoverPageUi.discoverTagsTabOrder.map((discoverTagTabValue, index) => (
        <TabPabel key={discoverTagTabValue} value={currentIndex} index={index}>
          {renderTabPanel(discoverTagTabValue)}
        </TabPabel>
      ))}
    </ResponsiveDialog>
  );
};
