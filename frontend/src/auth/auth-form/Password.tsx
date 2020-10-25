import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useRef } from "react";
import * as yup from "yup";
import useAuthForm from "./useAuthForm";

const schema = yup.object().shape({});

export default () => {
  const authForm = useAuthForm();
  const refPassword = useRef<HTMLInputElement>();

  const handleCancel = () => {};

  const handleSubmit = async () => {
    const email = authForm.email || "";
    const password = refPassword.current?.value || "";

    await authForm.signIn({
      email,
      password,
    });
  };

  return (
    <Box p={2}>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Sign in with email
      </Typography>

      <TextField
        type="email"
        name="email"
        label="Email"
        value={authForm.email}
        fullWidth
        disabled
      />
      <TextField
        inputRef={refPassword}
        type="password"
        name="password"
        label="Password"
        fullWidth
        autoFocus
        autoComplete="on"
      />
      <Box textAlign="right" marginTop={2} p={2}>
        <Box display="inline-block" marginRight={2}>
          <Button
            color="primary"
            onClick={handleCancel}
            style={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
        </Box>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{ fontWeight: "bold" }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};
