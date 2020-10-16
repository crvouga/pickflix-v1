import React from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { palette } from "../tmdb/attribution";

import "fontsource-roboto";

export const theme = createMuiTheme({
  props: {
    MuiTypography: {
      style: { fontWeight: "bold" },
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: palette.secondary,
      dark: palette.primary,
    },
    secondary: {
      main: palette.tertiary,
    },
    background: {
      paper: "#202020",
      default: "#101010",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          //prevent double-tap zoom
          touchAction: "manipulation",
        },
      },
    },
  },
});

export default ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
