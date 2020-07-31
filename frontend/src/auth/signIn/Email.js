import { yupResolver } from "@hookform/resolvers";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import auth from "../redux";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default () => {
  const dispatch = useDispatch();
  const initialFormValues = useSelector(auth.selectors.formValues);

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormValues,
  });

  const handleCancel = () => {
    dispatch(auth.actions.setFormStep(auth.FormStep.signIn));
  };

  const handleNext = async (data) => {
    dispatch(auth.actions.nextFormStep(data));
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
