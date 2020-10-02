import { ListItem, ListItemText, ListItemTextProps } from "@material-ui/core";
import React from "react";

type Props = {
  ListItemTextProps: ListItemTextProps;
};

export default (props: Props) => {
  const { ListItemTextProps } = props;
  return (
    <ListItem>
      <ListItemText
        primaryTypographyProps={{
          style: { fontWeight: "bold" },
        }}
        secondaryTypographyProps={{
          variant: "body1",
        }}
        {...ListItemTextProps}
      />
    </ListItem>
  );
};
