import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import { SubmitButton } from "../../../common/components/SubmitButton";
import useBoolean from "../../../common/hooks/useBoolean";
import { signUp } from "../query/mutations";
export default ({
  emailAddress,
  username,
  displayName,
}: {
  emailAddress: string;
  username: string;
  displayName: string;
}) => {
  const isPasswordVisible = useBoolean(false);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const disabled = password !== passwordRepeat || password === "";

  const handleSubmit = async () => {
    await signUp({
      emailAddress,
      username,
      password,
      displayName,
    });
  };

  return (
    <React.Fragment>
      <Typography align="center" variant="h6">
        {emailAddress}
      </Typography>
      <Typography align="center" gutterBottom variant="h6">
        {username}
      </Typography>

      <Box paddingBottom={2}>
        <TextField
          variant="outlined"
          type={isPasswordVisible.value ? undefined : "password"}
          label="Password"
          fullWidth
          autoCorrect="off"
          autoCapitalize="none"
          autoComplete="off"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          helperText="Make it something simple"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={isPasswordVisible.toggle}
                >
                  {isPasswordVisible.value ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box paddingBottom={2}>
        <TextField
          variant="outlined"
          type={isPasswordVisible.value ? undefined : "password"}
          label="Repeat Password"
          fullWidth
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="none"
          helperText={
            password !== passwordRepeat ? "Does not match password" : ""
          }
          onChange={(e) => {
            setPasswordRepeat(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={isPasswordVisible.toggle}
                >
                  {isPasswordVisible.value ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <SubmitButton onClick={handleSubmit} fullWidth disabled={disabled}>
        Create Account
      </SubmitButton>
    </React.Fragment>
  );
};
