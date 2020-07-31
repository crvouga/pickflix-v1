import { yupResolver } from "@hookform/resolvers";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import auth from "../redux";

const schema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default () => {
  const status = useSelector(auth.selectors.status);
  const dispatch = useDispatch();
  const { email } = useSelector(auth.selectors.formValues);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "      ",
      confirmPassword: "      ",
      displayName: "Chris Vouga",
      email: email,
    },
  });

  const handleCancel = () => {
    dispatch(auth.actions.setFormStep(auth.FormStep.signIn));
  };

  const submit = (data) => {
    dispatch(auth.actions.register(data));
  };

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Create an Account
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          as={TextField}
          name="email"
          label="Email"
          control={control}
          fullWidth
          disabled
        />
        <Controller
          as={TextField}
          name="displayName"
          label="Display Name"
          control={control}
          fullWidth
          error={errors?.displayName}
          helperText={errors?.displayName?.message}
        />
        <Controller
          control={control}
          as={TextField}
          type="password"
          name="password"
          label="Password"
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
            disabled={status === "loading"}
            type="submit"
            variant="contained"
            color="primary"
            style={{ fontWeight: "bold" }}
          >
            Create Account
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};
