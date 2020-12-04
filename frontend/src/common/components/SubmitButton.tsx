import { Box, Button, ButtonProps } from "@material-ui/core";
import React from "react";

export const SubmitButton = (props: ButtonProps) => {
  return (
    <Box
      color={props.disabled ? "action.disabled" : "text.primary"}
      fontWeight="bold"
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ color: "inherit", fontWeight: "inherit" }}
        {...props}
      />
    </Box>
  );
};
