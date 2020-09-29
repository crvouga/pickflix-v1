import { yupResolver } from "@hookform/resolvers";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import form from "./redux";
import { FormValues } from "./redux/types";

const schema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
});

export default () => {
  const status = useSelector(form.selectors.status);
  const dispatch = useDispatch();
  const initialValues = useSelector(form.selectors.values);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "      ",
      confirmPassword: "      ",
      displayName: "Chris Vouga",
      ...initialValues,
    },
  });

  const handleCancel = () => {
    dispatch(form.actions.reset());
  };

  const submit = (data: FormValues) => {
    dispatch(form.actions.register(data));
  };

  return (
    <Box p={4}>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Create an Account
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          as={TextField}
          name="email"
          label="Email"
          control={control}
          error={Boolean(errors?.email)}
          helperText={errors?.email?.message}
          fullWidth
          disabled
        />
        <Controller
          as={TextField}
          name="displayName"
          label="Display Name"
          control={control}
          fullWidth
          error={Boolean(errors?.displayName)}
          helperText={errors?.displayName?.message}
        />
        <Controller
          control={control}
          as={TextField}
          type="password"
          name="password"
          label="Password"
          fullWidth
          error={Boolean(errors?.password)}
          helperText={errors?.password?.message}
        />
        <Controller
          control={control}
          as={TextField}
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          fullWidth
          error={Boolean(errors?.confirmPassword)}
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
    </Box>
  );
};
