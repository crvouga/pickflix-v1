import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import signIn from "./redux/signIn";
import SignIn from "./SignIn";
import Email from "./Email";
import EmailPassword from "./EmailPassword";
import EmailRegister from "./EmailRegister";
import EmailTaken from "./EmailTaken";

export default () => {
  const step = useSelector(signIn.selectors.step);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signIn.actions.setStep(signIn.Step.signIn));
  }, []);
  return {
    [signIn.Step.signIn]: <SignIn />,
    [signIn.Step.email]: <Email />,
    [signIn.Step.emailTaken]: <EmailTaken />,
    [signIn.Step.emailRegister]: <EmailRegister />,
    [signIn.Step.emailPassword]: <EmailPassword />,
  }[step];
};
