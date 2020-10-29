import { useMediaQuery, useTheme } from "@material-ui/core";

export default () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("xs"));
};
