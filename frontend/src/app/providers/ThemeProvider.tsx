import {
  createTheme, CssBaseline as MuiCssBaseline, responsiveFontSizes, ThemeProvider,
  withStyles
} from "@material-ui/core";
import "fontsource-roboto";
import React from "react";
import palette from "../../palette.json";

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontWeightRegular: "bold",
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
        paper: "#212121",
        default: "#101010",
      },
    },

    props: {
      MuiTypography: {
        // shouldn't do this but its a hack to fix invalid component nesting errors
        variantMapping: {
          h1: 'div',
          h2: 'div',
          h3: 'div',
          h4: 'div',
          h5: 'div',
          h6: 'div',
          subtitle1: 'div',
          subtitle2: 'div',
          body1: 'div',
          body2: 'div',
        }
      }
    }
  })
);

const CssBaseline = withStyles((theme) => ({
  "@global": {
    body: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollBarWidth: "none",
      "-ms-overflow-style": "none",
    },
    html: {
      touchAction: "manipulation", //prevent double-tap zoom
      scrollbarColor: `${theme.palette.grey[800]} ${theme.palette.background.default}`,
    },
    "*::-webkit-scrollbar": {
      // width: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    "*::-webkit-scrollbar-track": {
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.grey[800], //theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.grey[900],
      },
    },
    "::-webkit-scrollbar-corner": {
      background: theme.palette.background.default,
    },
  },
}))(MuiCssBaseline);

export default ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
