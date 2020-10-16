import { yupResolver } from "@hookform/resolvers";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { authForm } from "./redux/auth-form";
import { FormValues, SignInMethod } from "./redux/types";

const schema = yup.object().shape({});

export default () => {
  const dispatch = useDispatch();
  const values = useSelector(authForm.selectors.values);

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...values, password: "" },
  });

  const handleCancel = () => {
    dispatch(authForm.actions.reset());
  };

  const submit = (data: FormValues) => {
    dispatch(
      authForm.actions.submit({
        signInMethod: SignInMethod.Password,
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <Box p={4}>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Sign in with email
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          control={control}
          as={TextField}
          type="email"
          name="email"
          label="Email"
          fullWidth
          disabled
          error={Boolean(errors?.email)}
          helperText={errors?.email?.message}
        />
        <Controller
          control={control}
          as={TextField}
          type="password"
          name="password"
          label="Password"
          fullWidth
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
  );
};
