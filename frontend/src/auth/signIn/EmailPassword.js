import { yupResolver } from "@hookform/resolvers";
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import * as yup from "yup";
import signIn from "./redux/signIn";

const schema = yup.object().shape({});

export default () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { email } = useSelector(signIn.selectors.form);
  const { handleSubmit, errors, setError, control } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCancel = () => {
    dispatch(signIn.actions.setStep(signIn.Step.signIn));
  };

  const submit = (data) => {
    firebase
      .login({ email, password: data.password })
      .then((result) => {
        enqueueSnackbar(`${result.user.user.email} signed in`, {
          variant: "info",
        });
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setError("password", { message: error.message });
        }
      });
  };

  return (
    <Paper>
      <Box padding={4} maxWidth="360px" m="auto" marginTop={6}>
        <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
          Sign in with email
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            name="email"
            label="Email"
            defaultValue={email}
            fullWidth
            disabled
          />
          <Controller
            control={control}
            as={TextField}
            type="password"
            name="password"
            label="Password"
            fullWidth
            defaultValue=""
            autoFocus
            error={Boolean(errors?.password)}
            helperText={errors?.password?.message}
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
              type="submit"
              variant="contained"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};
