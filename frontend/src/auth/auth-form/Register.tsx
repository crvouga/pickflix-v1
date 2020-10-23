import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import useAuthForm from "./useAuthForm";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(1),
  },
}));

export default () => {
  const classes = useStyles();
  const authForm = useAuthForm();

  const refUsername = useRef<HTMLInputElement>();
  const refDisplayName = useRef<HTMLInputElement>();
  const refPassword = useRef<HTMLInputElement>();
  const refConfirmPassword = useRef<HTMLInputElement>();

  const [errors, setErrors] = useState<{ key: string; message: string }[]>([]);

  const handleCancel = () => {};

  const submit = () => {
    const username = (refUsername.current?.value || "").trim();
    const displayName = (refDisplayName.current?.value || "").trim();
    const password = (refPassword.current?.value || "").trim();
    const confirmPassword = (refPassword.current?.value || "").trim();

    const errors = [];

    if (username.length === 0) {
      errors.push({
        key: "username",
        message: "Username can not be empty.",
      });
    }

    if (password !== confirmPassword) {
      errors.push({
        key: "confirmPassword",
        message: "Must match password.",
      });
    }

    if (errors.length > 0) {
      setErrors(errors);
    } else if (authForm.email) {
      authForm.createUserWithPassword({
        email: authForm.email,
        username,
        password,
      });
    }
  };

  return (
    <Box p={2}>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Create an Account
      </Typography>

      <TextField
        className={classes.textField}
        label="Email"
        value={authForm.email || ""}
        disabled
        fullWidth
      />
      <TextField
        className={classes.textField}
        inputRef={refUsername}
        label="Username"
        fullWidth
      />
      <TextField
        className={classes.textField}
        inputRef={refPassword}
        type="password"
        label="Password"
        fullWidth
      />
      <TextField
        className={classes.textField}
        inputRef={refConfirmPassword}
        type="password"
        label="Confirm Password"
        fullWidth
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
          Create Account
        </Button>
      </Box>
    </Box>
  );
};
