import { Button, LinearProgress } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("No password provided"),
});

const initialValues = {
  email: `crvouga@gmail.com`,
  password: "password",
};

export default () => {
  const onSubmit = (formValues, formActions) => {};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            fullWidth
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />
          <Field
            fullWidth
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          <Button
            style={{ marginTop: 18 }}
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Login
          </Button>
          {isSubmitting && <LinearProgress color="secondary" />}
        </Form>
      )}
    </Formik>
  );
};
