import React from "react";
import { useQueryCache } from "react-query";
import { useHistory } from "react-router";
import LoadingDialog from "../../common/components/LoadingDialog";
import useBoolean from "../../common/hooks/useBoolean";
import { useSnackbar } from "../../app/modals/redux/snackbar";
import { useListener } from "../../common/utility";
import { authEventEmitter } from "./query/mutations";

const SigningIn = () => {
  const isLoading = useBoolean(false);
  const history = useHistory();
  const snackbar = useSnackbar();
  const queryCache = useQueryCache();

  useListener(authEventEmitter, "signIn", () => {
    isLoading.setTrue();
  });

  useListener(authEventEmitter, "signInSuccess", (user) => {
    snackbar.display({
      message: `Signed in as ${user.username}`,
    });
  });

  useListener(authEventEmitter, "signInSettled", () => {
    history.push("/");
    isLoading.setFalse();
    queryCache.invalidateQueries((query) =>
      query.queryKey.includes("current-user")
    );
  });

  return (
    <LoadingDialog
      open={isLoading.value}
      ListItemTextProps={{ primary: "Signing In" }}
    />
  );
};

const SigningOut = () => {
  const isLoading = useBoolean(false);
  const history = useHistory();
  const snackbar = useSnackbar();
  const queryCache = useQueryCache();

  useListener(authEventEmitter, "signOut", () => {
    isLoading.setTrue();
  });

  useListener(authEventEmitter, "signOutSuccess", () => {
    snackbar.display({
      message: `Signed out`,
    });
  });

  useListener(authEventEmitter, "signOutSettled", () => {
    history.push("/");
    isLoading.setFalse();
    queryCache.invalidateQueries(
      (query) =>
        query.queryKey.includes("current-user") ||
        query.queryKey.includes("lists")
    );
  });

  return (
    <LoadingDialog
      open={isLoading.value}
      ListItemTextProps={{ primary: "Signing Out" }}
    />
  );
};

const SigningUp = () => {
  const isLoading = useBoolean(false);
  const history = useHistory();
  const snackbar = useSnackbar();
  const queryCache = useQueryCache();

  useListener(authEventEmitter, "signUp", () => {
    isLoading.setTrue();
  });

  useListener(authEventEmitter, "signUpSuccess", (user) => {
    snackbar.display({
      message: `Signed up ${user.username}`,
    });
  });

  useListener(authEventEmitter, "signUpSettled", () => {
    history.push("/");
    isLoading.setFalse();
    queryCache.invalidateQueries((query) =>
      query.queryKey.includes("current-user")
    );
  });

  return (
    <LoadingDialog
      open={isLoading.value}
      ListItemTextProps={{ primary: "Signing Up" }}
    />
  );
};

export default () => {
  return (
    <React.Fragment>
      <SigningUp />
      <SigningIn />
      <SigningOut />
    </React.Fragment>
  );
};
