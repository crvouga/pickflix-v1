import { User } from "../../query";
import { createEventEmitter } from "../../../common/utility";
import {
  deleteAuth,
  postAuth,
  PostAuthParams,
  postUserWithPassword,
  PostUserWithPasswordParams,
} from ".";

export const authEventEmitter = createEventEmitter<{
  signUp: undefined;
  signUpSuccess: User;
  signUpError: undefined;
  signUpSettled: undefined;
  //
  signOut: undefined;
  signOutError: undefined;
  signOutSuccess: undefined;
  signOutSettled: undefined;
  //
  signIn: undefined;
  signInSuccess: User;
  signInError: undefined;
  signInSettled: undefined;
}>();

export const signUp = async (params: PostUserWithPasswordParams) => {
  authEventEmitter.emit("signUp");
  try {
    const user = await postUserWithPassword(params);
    authEventEmitter.emit("signUpSuccess", user);
  } catch (error) {
    authEventEmitter.emit("signUpError");
    throw error;
  } finally {
    authEventEmitter.emit("signUpSettled");
  }
};

export const signIn = async (params: PostAuthParams) => {
  authEventEmitter.emit("signIn");
  try {
    const user = await postAuth(params);
    authEventEmitter.emit("signInSuccess", user);
  } catch (error) {
    authEventEmitter.emit("signInError");
    throw error;
  } finally {
    authEventEmitter.emit("signInSettled");
  }
};

export const signOut = async () => {
  authEventEmitter.emit("signOut");
  try {
    await deleteAuth();
    authEventEmitter.emit("signOutSuccess");
  } catch (error) {
    authEventEmitter.emit("signOutError");
    throw error;
  } finally {
    authEventEmitter.emit("signOutSettled");
  }
};
