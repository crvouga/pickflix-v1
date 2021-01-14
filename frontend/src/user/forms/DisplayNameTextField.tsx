import { TextField, TextFieldProps } from "@material-ui/core";
import React, { useState } from "react";
import { isValidDisplayName, MAX_DISPLAY_NAME_LENGTH } from "../query";

type Props = {
  currentDisplayName?: string;
};

type DisplayNameTextFieldState = {
  displayName: string;
  setDisplayName: (displayName: string) => void;
  isError: boolean;
  isValid: boolean;
  TextFieldProps: TextFieldProps;
};

export const useDisplayNameTextFieldState = ({
  currentDisplayName = "",
}: Props): DisplayNameTextFieldState => {
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const isValid = isValidDisplayName(displayName);
  const isError = !isValid;

  const helperText = !isValid
    ? "Invalid username"
    : "Help people search for your account by using the name you're known by.";

  const onChange = (event: React.ChangeEvent<{ value: string }>) => {
    const newDisplayName = event.target.value.slice(0, MAX_DISPLAY_NAME_LENGTH);
    event.target.value = newDisplayName;
    setDisplayName(newDisplayName);
  };

  return {
    displayName,
    setDisplayName,

    isError,
    isValid,

    TextFieldProps: {
      onChange,
      helperText,
      defaultValue: currentDisplayName,
    },
  };
};

export const DisplayNameTextField = ({
  state,
  ...props
}: {
  state: DisplayNameTextFieldState;
} & TextFieldProps) => {
  return (
    <TextField
      label="Name"
      fullWidth
      error={state.isError}
      {...state.TextFieldProps}
      {...props}
    />
  );
};
