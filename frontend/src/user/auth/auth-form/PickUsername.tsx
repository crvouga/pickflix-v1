import { Box, Button, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import UsernameTextField from "../../forms/UsernameTextField";
import useUsernameValidation from "../../forms/useUsernameValidation";

export default ({ emailAddress }: { emailAddress: string }) => {
  const refUsername = useRef<HTMLInputElement>();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const { isInvalid, helperText, isLoading } = useUsernameValidation(username);

  const handleSubmit = () => {
    history.push(`/auth?emailAddress=${emailAddress}&username=${username}`);
  };

  const disabled = isInvalid || isLoading;

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
          error={isInvalid && username.length > 0}
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
