import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";
import Markdown, { MarkdownProps } from "./Markdown";

type Props = React.PropsWithChildren<TypographyProps<"div"> & MarkdownProps>;

export default ({ source, children, ...props }: Props) => {
  return (
    <Typography component="div" variant="body1" {...props}>
      <Markdown>{children}</Markdown>
    </Typography>
  );
};
