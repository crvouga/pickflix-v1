import { Box, LinearProgress, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import form from "./redux";
import Email from "./Email";
import EmailPassword from "./EmailPassword";
import EmailRegister from "./EmailRegister";
import EmailTaken from "./EmailTaken";
import SignIn from "./SignIn";
import ErrorMessage from "./ErrorMessage";

export default () => {
  const step = useSelector(form.selectors.step);
  const status = useSelector(form.selectors.status);

  return (
    <Box
      display="flex"
      width="100%"
      marginTop={6}
      justifyContent="center"
      alignItems="center"
    >
      <Box width="360px" component={Paper}>
        {status === "loading" && <LinearProgress variant="query" />}
        <ErrorMessage />
        <Box p={4}>
          {
            {
              [form.Step.signIn]: <SignIn />,
              [form.Step.email]: <Email />,
              [form.Step.emailTaken]: <EmailTaken />,
              [form.Step.emailRegister]: <EmailRegister />,
              [form.Step.emailPassword]: <EmailPassword />,
            }[step]
          }
        </Box>
      </Box>
    </Box>
  );
};
