import { yupResolver } from "@hookform/resolvers";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import auth from "../redux";

const schema = yup.object().shape({});

export default () => {
  const dispatch = useDispatch();
  const { email } = useSelector(auth.selectors.formValues);
  const { handleSubmit, errors, setError, control } = useForm({
    resolver: yupResolver(schema),
  });
  const formErrors = useSelector(auth.selectors.formErrors);
  useEffect(() => {
    Object.entries(formErrors).forEach(([key, value]) => setError(key, value));
  }, [formErrors]);

  const handleCancel = () => {
    dispatch(auth.actions.setFormStep(auth.FormStep.signIn));
  };

  const submit = (data) => {
    dispatch(
      auth.actions.signIn({
        method: auth.Method.Password,
        email,
        password: data.password,
      })
    );
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
