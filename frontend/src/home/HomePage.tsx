import React from "react";
import ResponsiveNavigation from "../app/navigation/ResponsiveNavigation";
import TabsAndTabPanels from "./TabsAndTabPanels";

export default () => {
  return (
    <React.Fragment>
      <ResponsiveNavigation />
      <TabsAndTabPanels />
    </React.Fragment>
  );
};
