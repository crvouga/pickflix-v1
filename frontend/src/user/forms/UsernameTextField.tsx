import { CircularProgress, TextField, TextFieldProps } from "@material-ui/core";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { isValidUsername, MAX_USERNAME_LENGTH, useQueryUsers } from "../query";

type Props = {
  currentUsername?: string;
};

type UsernameTextFieldState = {
  username: string;
  setUsername: (newUsername: string) => void;
  isError: boolean;
  isLoading: boolean;
  isValid: boolean;
  TextFieldProps: TextFieldProps;
};

const useIsUsernameTaken = (username: string) => {
  const [debounced] = useDebounce(username, 1000 / 3);
  const query = useQueryUsers(
    {
      username: debounced,
    },
    {
      retry: 0,
    }
  );
  const user = query.data?.results?.[0]?.user || undefined;
  const isTaken = Boolean(user);
  const isLoading = query.status === "loading";

  return {
    isTaken,
    isLoading,
  };
};

export const useUsernameTextFieldState = ({
  currentUsername = "",
}: Props): UsernameTextFieldState => {
  const [username, setUsername] = useState(currentUsername);
  const { isTaken, isLoading } = useIsUsernameTaken(username);

  const isValid = isValidUsername(username);

  const isCurrentUsername = username === currentUsername;

  const isError = (isTaken || !isValid) && !isCurrentUsername && !isLoading;

  const helperText =
    isTaken && !isCurrentUsername && !isLoading
      ? "Username taken"
      : !isValid
        ? "Invalid username"
        : "";

  const onChange = (event: React.ChangeEvent<{ value: string }>) => {
    const newUsername = event.target.value.slice(0, MAX_USERNAME_LENGTH);
    event.target.value = newUsername;
    setUsername(newUsername);
  };

  return {
    username,
    setUsername,

    isError,
    isLoading,
    isValid,

    TextFieldProps: {
      onChange,
      helperText,
      defaultValue: currentUsername,
    },
  };
};

export const UsernameTextField = ({
  state,
}: {
  state: UsernameTextFieldState;
}) => {
  const { isError, isLoading, TextFieldProps } = state;

  return (
    <TextField
      label="Username"
      fullWidth
      error={isError}
      InputProps={{
        endAdornment: isLoading ? <CircularProgress size="2em" /> : undefined,
      }}
      {...TextFieldProps}
    />
  );
};
