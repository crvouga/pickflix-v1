import { createMuiTheme } from "@material-ui/core";
import { palette } from "../tmdb/attribution";

export default () => {
  return createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: palette.secondary,
      },
      secondary: {
        main: palette.tertiary,
      },
      background: {
        paper: "#202020",
        default: "#101010",
      },
    },
  });
};
