import { createMuiTheme } from "@material-ui/core";
import { palette } from "../tmdb/attribution";

export default () => {
  return createMuiTheme({
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
      MuiTypography: {
        fontWeight: "bold",
      },
      MuiCssBaseline: {
        "@global": {
          html: {
            fontWeight: "bold",
          },
        },
      },
    },
  });
};
