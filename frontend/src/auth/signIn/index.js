import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../redux";
import Email from "./Email";
import EmailPassword from "./EmailPassword";
import EmailRegister from "./EmailRegister";
import EmailTaken from "./EmailTaken";
import SignIn from "./SignIn";
import { Box, Paper, LinearProgress } from "@material-ui/core";

const FormStep = auth.FormStep;

export default () => {
  const formStep = useSelector(auth.selectors.formStep);
  const status = useSelector(auth.selectors.status);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth.actions.setStatus());
    dispatch(auth.actions.setFormStep(auth.FormStep.signIn));
  }, []);

  return (
    <Box
      display="flex"
      width="100%"
      marginTop={6}
      justifyContent="center"
      alignItems="center"
    >
      <Paper>
        {status === "loading" && <LinearProgress variant="query" />}
        <Box p={4} width="360px">
          {
            {
              [FormStep.signIn]: <SignIn />,
              [FormStep.email]: <Email />,
              [FormStep.emailTaken]: <EmailTaken />,
              [FormStep.emailRegister]: <EmailRegister />,
              [FormStep.emailPassword]: <EmailPassword />,
            }[formStep]
          }
        </Box>
      </Paper>
    </Box>
  );
};
