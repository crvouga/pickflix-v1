import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import {
  DisplayNameTextField,
  useDisplayNameTextFieldState,
} from "../../forms/DisplayNameTextField";
import {
  UsernameTextField,
  useUsernameTextFieldState,
} from "../../forms/UsernameTextField";

export default ({ emailAddress }: { emailAddress: string }) => {
  const history = useHistory();
  const displayNameTextFieldState = useDisplayNameTextFieldState({});
  const usernameTextFieldState = useUsernameTextFieldState({});

  const { displayName } = displayNameTextFieldState;
  const { username } = usernameTextFieldState;

  const handleSubmit = () => {
    history.push(
      `/auth?emailAddress=${emailAddress}&username=${username}&displayName=${encodeURI(
        displayName
      )}`
    );
  };

  const disabled =
    usernameTextFieldState.isError ||
    usernameTextFieldState.isLoading ||
    displayNameTextFieldState.isError ||
    username.length === 0;

  return (
    <React.Fragment>
      <Box paddingBottom={1}>
        <Typography variant="h5" align="center">
          Pick a username
        </Typography>
      </Box>
      <Box paddingBottom={2}>
        <Typography align="center">{emailAddress}</Typography>
      </Box>

      <DisplayNameTextField state={displayNameTextFieldState} />

      <Box paddingBottom={2}>
        <UsernameTextField state={usernameTextFieldState} />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        disabled={disabled}
      >
        Next
      </Button>
    </React.Fragment>
  );
};
