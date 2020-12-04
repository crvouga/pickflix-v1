import {
  Dialog,
  DialogProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    // backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
      marginBottom: "auto",
      minHeight: "360px",
      // maxHeight: "480px",
      width: "480px",
      zIndex: theme.zIndex.snackbar - 1,
    },
  },
}));

export const ResponsiveDialog = (props: DialogProps) => {
  const classesDialog = useStylesDialog();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return <Dialog classes={classesDialog} fullScreen={isMobile} {...props} />;
};

export const DoneButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Paper>
      <List>
        <ListItem button onClick={onClick}>
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            primary="Done"
          />
        </ListItem>
      </List>
    </Paper>
  );
};
