import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import useSnackbar from "../../snackbar/useSnackbar";
import { AuthMethod, getAuthMethods } from "../query/reads";
import {
  postAuth,
  PostAuthParams,
  postUserWithPassword,
  PostUserWithPasswordParams,
} from "../query/writes";
import { authForm, AuthFormStep } from "./redux/auth-form";

const useAuthFormState = () => {
  const dispatch = useDispatch();
  const slice = useSelector(authForm.selectors.slice);
  return {
    ...slice,
    ...bindActionCreators(authForm.actions, dispatch),
  };
};

export default () => {
  const history = useHistory();
  const snackbar = useSnackbar();
  const authFormState = useAuthFormState();

  const isUsernameTaken = async (username: string) => {};

  const emailToNextStep = async (email: string) => {
    try {
      const authMethods = await getAuthMethods(email);

      const nextStep =
        authMethods.length === 0
          ? AuthFormStep.emailRegister
          : authMethods.includes(AuthMethod.password)
          ? AuthFormStep.emailPassword
          : AuthFormStep.emailPassword;

      return nextStep;
    } catch (error) {
      authFormState.setError(error);
      throw error;
    }
  };

  const register = async (params: PostUserWithPasswordParams) => {
    const user = await postUserWithPassword(params);
    history.push("/");
    snackbar.display({
      message: `Signed as ${user.username} (${user.email})`,
    });
  };

  const signIn = async (params: PostAuthParams) => {
    const user = await postAuth(params);
    history.push("/");
    snackbar.display({
      message: `Signed as ${user.username} (${user.email})`,
    });
  };

  return {
    ...authFormState,
    isUsernameTaken,
    emailToNextStep,
    register,
    signIn,
  };
};
