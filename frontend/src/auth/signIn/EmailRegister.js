import { yupResolver } from "@hookform/resolvers";
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";
import * as yup from "yup";
import signIn from "./redux/signIn";
import { useSnackbar } from "notistack";

const schema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { email } = useSelector(signIn.selectors.form);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "      ",
      confirmPassword: "      ",
      displayName: "Chris Vouga",
    },
  });

  const handleCancel = () => {
    dispatch(signIn.actions.setStep("signIn"));
  };
  const { enqueueSnackbar } = useSnackbar();
  const submit = (data) => {
    firebase
      .createUser({
        email,
        password: data.password,
      })
      .then((result) => {
        result.user
          .updateProfile({ displayName: data.displayName })
          .then(() => {
            enqueueSnackbar(`Created a new account. ${email}`, {
              variant: "success",
            });
          });
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <Paper>
      <Box padding={4} maxWidth="360px" m="auto" marginTop={6}>
        <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
          Create an Account
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
            as={TextField}
            name="displayName"
            label="Display Name"
            control={control}
            fullWidth
            defaultValue=""
            error={errors?.displayName}
            helperText={errors?.displayName?.message}
          />
          <Controller
            control={control}
            as={TextField}
            type="password"
            name="password"
            label="Password"
            defaultValue=""
            fullWidth
            error={errors?.password}
            helperText={errors?.password?.message}
          />
          <Controller
            control={control}
            as={TextField}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            defaultValue=""
            error={errors?.confirmPassword}
            helperText={errors?.confirmPassword?.message}
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
              Create Account
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};
