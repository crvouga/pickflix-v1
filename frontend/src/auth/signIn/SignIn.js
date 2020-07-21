import { Avatar, Box } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import signIn from "./redux/signIn";
import SignInButton from "./SignInButton";
import { useSnackbar } from "notistack";

const googleIconURL =
  "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

const facebookIconURL =
  "https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512";

const twitterIconURL =
  "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/600px-Twitter_Bird.svg.png";

export default () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleGoogleSignIn = () => {
    firebase
      .login({ provider: "google", type: "popup" })
      .then((result) => {
        enqueueSnackbar(`${result.user.email} signed in`, {
          variant: "info",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmailSignIn = () => {
    dispatch(signIn.actions.setStep(signIn.Step.email));
  };

  return (
    <Box padding={4} maxWidth="360px" m="auto" marginTop={6}>
      <Box marginBottom={4}>
        <Avatar style={{ margin: "auto", width: "100px", height: "100px" }} />
      </Box>
      <SignInButton
        icon={<img style={{ width: 24, height: 24 }} src={googleIconURL} />}
        text="Sign in with Google"
        onClick={handleGoogleSignIn}
      />
      {/* <SignInButton
        icon={<img style={{ width: 24, height: 24 }} src={facebookIconURL} />}
        text="Sign in with Facebook"
      />
      <SignInButton
        icon={<img style={{ width: 30, height: 24 }} src={twitterIconURL} />}
        text="Sign in with Twitter"
      /> */}
      <SignInButton
        icon={<EmailIcon />}
        text="Sign in with email"
        onClick={handleEmailSignIn}
      />
    </Box>
  );
};
