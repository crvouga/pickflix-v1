import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import useSnackbar from "../../snackbar/useSnackbar";
import { CredentialType, getCrendentialTypesForEmail } from "../query/reads";
import { authForm, AuthFormStep } from "./redux/auth-form";
import {
  PostUserWithPasswordParams,
  postUserWithPassword,
} from "../query/writes";

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
      const credentialTypes = await getCrendentialTypesForEmail(email);

      const nextStep =
        credentialTypes.length === 0
          ? AuthFormStep.emailRegister
          : credentialTypes.includes(CredentialType.password)
          ? AuthFormStep.emailPassword
          : AuthFormStep.emailTaken;

      return nextStep;
    } catch (error) {
      authFormState.setError(error);
      throw error;
    }
  };

  const createUserWithPassword = async (params: PostUserWithPasswordParams) => {
    const user = await postUserWithPassword(params);
    history.push("/");
    snackbar.display({
      message: `Signed as ${user.username} (${user.email})`,
    });
  };

  return {
    ...authFormState,
    isUsernameTaken,
    emailToNextStep,
    createUserWithPassword,
  };
};
