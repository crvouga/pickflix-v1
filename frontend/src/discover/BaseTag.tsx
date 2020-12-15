import { Chip, withStyles } from "@material-ui/core";

export default withStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    borderRadius: theme.spacing(2),
  },
  label: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  avatar: {},
}))(Chip);
