import { Box, Button, TextField, Typography } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { SubmitButton } from "../../../common/components/SubmitButton";

export default () => {
  const history = useHistory();
  const refEmailAddress = useRef<HTMLInputElement>();
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setDisabled(!EmailValidator.validate(e.target.value));
  };

  const handleSubmit = async () => {
    const emailAddress = refEmailAddress.current?.value || "";
    history.push(`/auth?emailAddress=${emailAddress}`);
  };

  return (
    <React.Fragment>
      <Box paddingBottom={2}>
        <Typography variant="h5" align="center">
          Enter your email
        </Typography>
      </Box>

      <Box paddingBottom={2}>
        <TextField
          variant="outlined"
          inputRef={refEmailAddress}
          label="Email"
          fullWidth
          onChange={handleChange}
          autoFocus
          type="email"
          autoCorrect="off"
          autoCapitalize="none"
        />
      </Box>
      <Box paddingBottom={2}>
        <SubmitButton disabled={disabled} fullWidth onClick={handleSubmit}>
          Continue
        </SubmitButton>
      </Box>
    </React.Fragment>
  );
};
