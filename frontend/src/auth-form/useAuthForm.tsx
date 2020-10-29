import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getAuthMethods, getUsers } from "../auth/query";
import { authForm, AuthFormStep } from "./redux/auth-form";
import { useHistory } from "react-router";

const useAuthFormState = () => {
  const dispatch = useDispatch();
  const slice = useSelector(authForm.selectors.slice);
  return {
    ...slice,
    ...bindActionCreators(authForm.actions, dispatch),
  };
};

export const useAuthForm = () => {
  const authFormState = useAuthFormState();
  const history = useHistory();

  // const submitCredential = async (email: string) => {
  //   try {
  //     const user = await getUser({ credential: email });
  //     authFormState.setUser(user);
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     history.push(`/auth?email=${email}`);
  //   }
  // };

  return {
    ...authFormState,
    // submitCredential,
  };
};
