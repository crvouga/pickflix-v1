import { Box, BoxProps, LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import Email from "./Email";
import Password from "./Password";

import ErrorMessage from "./ErrorMessage";
import { AuthFormStep } from "./redux/auth-form";
import Register from "./Register";
import useAuthForm from "./useAuthForm";

type Props = BoxProps;

export default (props: Props) => {
  const authForm = useAuthForm();

  useEffect(() => {
    authForm.reset();
  }, []);

  return (
    <Box width="100%" {...props}>
      {authForm.status === "loading" && <LinearProgress variant="query" />}
      <ErrorMessage />
      {
        {
          [AuthFormStep.email]: <Email />,
          [AuthFormStep.emailPassword]: <Password />,
          [AuthFormStep.emailRegister]: <Register />,
        }[authForm.step]
      }
    </Box>
  );
};
