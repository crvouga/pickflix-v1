import { useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import DesktopMoviePage from "./desktop/MoviePage";
import MobileMoviePage from "./mobile/MoviePage";

export default () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return <MobileMoviePage />; //isDesktop ? <DesktopMoviePage /> : <MobileMoviePage />;
};
