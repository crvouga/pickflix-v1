import { createMuiTheme } from "@material-ui/core";

const tmdbPalette = {
  // SOURCE: https://www.themoviedb.org/about/logos-attribution
  primary: "#0d253f",
  secondary: "#01b4e4",
  tertiary: "#90cea1",
};

export default () =>
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: tmdbPalette.secondary,
      },
      secondary: {
        main: tmdbPalette.tertiary,
      },
      background: {
        paper: "#202020",
        default: "#101010",
      },
    },
  });
