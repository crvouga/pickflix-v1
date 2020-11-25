import { CircularProgress, TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

type Props = {
  isLoading?: boolean;
} & TextFieldProps;

export default React.forwardRef(({ isLoading, ...props }: Props, ref) => {
  return (
    <TextField
      label="Username"
      inputRef={ref}
      InputProps={{
        endAdornment: (
          <React.Fragment>
            {isLoading && <CircularProgress disableShrink size="1.75em" />}
          </React.Fragment>
        ),
      }}
      {...props}
    />
  );
});
