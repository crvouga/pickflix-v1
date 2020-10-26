import { AppBar, AppBarProps, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import BackButton from "./BackButton";
import SearchButton from "./SearchButton";

type Props = {
  title?: string;
  subtitle?: string;
  AppBarProps?: AppBarProps;
};

export default (props: Props) => {
  const { title, AppBarProps } = props;

  return (
    <AppBar color="default" position="sticky" {...AppBarProps}>
      <Toolbar>
        <BackButton />
        <Typography variant="h6" style={{ flex: 1 }} noWrap>
          {title}
        </Typography>
        <SearchButton />
      </Toolbar>
    </AppBar>
  );
};
