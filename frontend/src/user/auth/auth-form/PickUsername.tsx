import { Box, Button, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import UsernameTextField from "../../forms/UsernameTextField";
import {
  useIsUsernameTaken,
  isValidUsername,
} from "../../forms/useUsernameValidation";

export default ({ emailAddress }: { emailAddress: string }) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const { isTaken, isLoading } = useIsUsernameTaken(username);
  const isValid = isValidUsername(username);

  const handleSubmit = () => {
    history.push(`/auth?emailAddress=${emailAddress}&username=${username}`);
  };

  const helperText =
    !isValid && username.length > 0
      ? "Invalid username"
      : isTaken
      ? "Username already being used"
      : "";

  const isError = !isValid || isTaken;
  const disabled = isError || isLoading || username.length === 0;

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

      <Box paddingBottom={2}>
        <UsernameTextField
          fullWidth
          isLoading={isLoading}
          error={isError && username.length > 0}
          helperText={helperText}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        disabled={disabled}
      >
        Pick Username
      </Button>
    </React.Fragment>
  );
};
