import { yupResolver } from "@hookform/resolvers";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import form from "./redux";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default () => {
  const dispatch = useDispatch();

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "crvouga@gmail.com",
    },
  });

  const handleCancel = () => {
    dispatch(form.actions.reset());
  };

  const handleNext = async (data) => {
    dispatch(form.actions.nextStep(data));
  };

  return (
    <Box p={4}>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Sign in with email
      </Typography>
      <form onSubmit={handleSubmit(handleNext)}>
        <Controller
          as={TextField}
          name="email"
          label="Email"
          control={control}
          defaultValue="crvouga@gmail.com"
          fullWidth
          error={errors?.email}
          helperText={errors?.email?.message}
          autoFocus
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
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};
