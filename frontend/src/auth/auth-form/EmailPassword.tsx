import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { authForm, FormValues } from "./redux/auth-form";

const schema = yup.object().shape({});

export default () => {
  const handleCancel = () => {};

  const submit = (data: FormValues) => {};

  return (
    <Box p={4}>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Sign in with email
      </Typography>

      <TextField type="email" name="email" label="Email" fullWidth disabled />
      <Controller
        as={TextField}
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
