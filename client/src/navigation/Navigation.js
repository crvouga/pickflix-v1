import React from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import DesktopNavigationBar from "./desktop/NavigationBar";
import MobileNavigationBar from "./mobile/NavigationBar";

export default ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <main>
      {isDesktop ? <DesktopNavigationBar /> : <MobileNavigationBar />}
      {children}
    </main>
  );
};
