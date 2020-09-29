import { Box, LinearProgress, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import form from "./redux";
import Email from "./Email";
import EmailPassword from "./EmailPassword";
import EmailRegister from "./EmailRegister";
import EmailTaken from "./EmailTaken";
import SignIn from "./SignIn";
import ErrorMessage from "./ErrorMessage";
import { Step } from "./redux/types";

export default () => {
  const step = useSelector(form.selectors.step);
  const status = useSelector(form.selectors.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(form.actions.reset());
  }, []);

  return (
    <Box width="360px">
      {status === "loading" && <LinearProgress variant="query" />}
      <ErrorMessage />
      {
        {
          [Step.signIn]: <SignIn />,
          [Step.email]: <Email />,
          [Step.emailTaken]: <EmailTaken />,
          [Step.emailRegister]: <EmailRegister />,
          [Step.emailPassword]: <EmailPassword />,
        }[step]
      }
    </Box>
  );
};
