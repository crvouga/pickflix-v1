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
import { SubmitButton } from "../../../common/components/SubmitButton";

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
      <Typography align="center" variant="h5" gutterBottom>
        Pick a username
      </Typography>
      <Typography align="center" variant="h6">
        {emailAddress}
      </Typography>
      <UsernameTextField state={usernameTextFieldState} />
      <Box paddingBottom={2}>
        <DisplayNameTextField
          state={displayNameTextFieldState}
          label={"Name (Optional)"}
        />
      </Box>

      <SubmitButton onClick={handleSubmit} fullWidth disabled={disabled}>
        Next
      </SubmitButton>
    </React.Fragment>
  );
};
