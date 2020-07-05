import { Button, LinearProgress } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  displayName: Yup.string().required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const initialValues = {
  displayName: `Chris V`,
  email: `crvouga@gmail.com`,
  password: "password",
  confirmPassword: "password",
};

export default () => {
  const onSubmit = (formValues, formActions) => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            style={{ marginBottom: 12 }}
            fullWidth
            component={TextField}
            name="displayName"
            label="Display Name"
          />

          <Field
            style={{ marginBottom: 12 }}
            fullWidth
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />

          <Field
            style={{ marginBottom: 12 }}
            fullWidth
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />

          <Field
            style={{ marginBottom: 12 }}
            fullWidth
            component={TextField}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
          />

          <Button
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Register
          </Button>
          {isSubmitting && <LinearProgress color="secondary" />}
        </Form>
      )}
    </Formik>
  );
};
