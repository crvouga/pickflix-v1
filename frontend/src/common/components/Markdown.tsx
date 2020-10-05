import { makeStyles, Typography, TypographyProps } from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  markdown: {
    "&:first-child": {
      marginTop: 0,
    },
    // marginBottom: "-1em",
    // marginTop: -theme.spacing(1.5),
    userSelect: "text",
    fontSize: "inherit",
    font: "inherit",
    wordBreak: "break-word",
    maxWidth: "100%",
    "& a": {
      color: theme.palette.info.main,
      textDecoration: "none",
      wordBreak: "break-all",
    },
  },
}));

export type MarkdownProps = React.PropsWithChildren<{
  source?: string;
}>;

export default ({ source, children }: MarkdownProps) => {
  const classes = useStyles();
  return (
    <ReactMarkdown
      // extremely nested <blockquote>...</blockquote> was rendering in youtube comments making it too wide
      disallowedTypes={["blockquote"]}
      className={classes.markdown}
      source={source}
    >
      {children}
    </ReactMarkdown>
  );
};
