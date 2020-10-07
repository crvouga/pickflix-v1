import { Box, BoxProps, LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChooseMethod from "./ChooseMethod";
import Email from "./Email";
import EmailPassword from "./EmailPassword";
import EmailRegister from "./EmailRegister";
import EmailTaken from "./EmailTaken";
import ErrorMessage from "./ErrorMessage";
import form from "./redux";
import { Step } from "./redux/types";

type Props = BoxProps;

export default (props: Props) => {
  const step = useSelector(form.selectors.step);
  const status = useSelector(form.selectors.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(form.actions.reset());
  }, [dispatch]);

  return (
    <Box width="100%" {...props}>
      {status === "loading" && <LinearProgress variant="query" />}
      <ErrorMessage />
      {
        {
          [Step.signIn]: <ChooseMethod />,
          [Step.email]: <Email />,
          [Step.emailTaken]: <EmailTaken />,
          [Step.emailRegister]: <EmailRegister />,
          [Step.emailPassword]: <EmailPassword />,
        }[step]
      }
    </Box>
  );
};
