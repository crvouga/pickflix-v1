import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  markdown: {
    marginTop: "-1em",
    marginBottom: "-1em",
    userSelect: "text",
    fontSize: "inherit",
    font: "inherit",
    wordBreak: "break-word",
    maxWidth: "100%",
    marginTop: -theme.spacing(1.5),
    "& a": {
      color: theme.palette.info.main,
      textDecoration: "none",
      wordBreak: "break-all",
    },
  },
}));

export default ({ children, source, ...props }) => {
  const classes = useStyles();
  return (
    <Typography
      component="div"
      color="textSecondary"
      varaint="body2"
      {...props}
    >
      <ReactMarkdown className={classes.markdown} source={source}>
        {children}
      </ReactMarkdown>
    </Typography>
  );
};
