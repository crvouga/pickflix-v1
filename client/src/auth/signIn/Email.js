import { yupResolver } from "@hookform/resolvers";
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";
import * as yup from "yup";
import signIn from "./redux/signIn";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const initialForm = useSelector(signIn.selectors.form);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialForm,
  });

  const handleCancel = () => {
    dispatch(signIn.actions.setStep(signIn.Step.signIn));
  };

  const handleNext = async (data) => {
    const { email } = data;
    dispatch(signIn.actions.setForm({ email }));

    const signInMethods = await firebase
      .auth()
      .fetchSignInMethodsForEmail(email);

    dispatch(signIn.actions.setMethods(signInMethods));

    if (signInMethods.length === 0) {
      dispatch(signIn.actions.setStep(signIn.Step.emailRegister));
    } else if (signInMethods.includes("password")) {
      dispatch(signIn.actions.setStep(signIn.Step.emailPassword));
    } else {
      dispatch(signIn.actions.setStep(signIn.Step.emailTaken));
    }
  };

  return (
    <Paper>
      <Box padding={4} maxWidth="360px" m="auto" marginTop={6}>
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
    </Paper>
  );
};
