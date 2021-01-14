import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { SubmitButton } from "../../../common/components/SubmitButton";
import AvatarUser from "../../components/AvatarUser";
import {
  PasswordTextField,
  usePasswordTextFieldState,
} from "../../forms/PasswordTextField";
import { User } from "../../query";
import { signIn } from "../query/mutations";

const useStyles = makeStyles(() => ({
  avatar: {
    transform: "scale(2)",
  },
}));

export default ({ user }: { user: User }) => {
  const classes = useStyles();
  const history = useHistory();

  const passwordTextFieldState = usePasswordTextFieldState();

  const handleForgotPassword = () => {
    history.push(
      `/auth?emailAddress=${user.emailAddress}&forgotPasswordFlag=1`
    );
  };

  const handleSubmit = async () => {
    try {
      await signIn({
        emailAddress: user.emailAddress,
        password: passwordTextFieldState.password,
      });
    } catch (error) {
      if (error?.response?.status === 400) {
        passwordTextFieldState.setIsError(true);
        passwordTextFieldState.setHelperText("Incorrect Password");
      } else {
      }
    }
  };

  const disabled = !passwordTextFieldState.isValid;

  return (
    <React.Fragment>
      <Box paddingBottom={4} display="flex" justifyContent="center">
        <AvatarUser className={classes.avatar} user={user} />
      </Box>

      <Box paddingBottom={2}>
        <Typography align="center" variant="h6">
          {user.emailAddress}
        </Typography>
      </Box>

      <Box paddingBottom={2}>
        <PasswordTextField state={passwordTextFieldState} />
      </Box>

      <Box paddingBottom={2}>
        <SubmitButton fullWidth disabled={disabled} onClick={handleSubmit}>
          Sign In
        </SubmitButton>
      </Box>
      <Box
        paddingBottom={2}
        display="flex"
        flexDirection="row-reverse"
        color="text.secondary"
      >
        <Button
          size="small"
          color="inherit"
          onClick={handleForgotPassword}
          variant="text"
        >
          Forgot Password?
        </Button>
      </Box>
    </React.Fragment>
  );
};
