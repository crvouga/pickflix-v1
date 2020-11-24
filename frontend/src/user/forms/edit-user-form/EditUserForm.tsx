import { Box, Button, ButtonProps, Hidden } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useEffect } from "react";
import WithAuthentication from "../../auth/WithAuthentication";
import { UserAggergation } from "../../query";
import UsernameTextField from "../UsernameTextField";
import useEditUserForm from "./useEditUserForm";

const CancelButton = (props: ButtonProps) => {
  return (
    <Button size="large" {...props}>
      Cancel
    </Button>
  );
};

const SubmitButton = (props: ButtonProps) => {
  return (
    <Box
      color={props.disabled ? "action.disabled" : "text.primary"}
      fontWeight="bold"
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ArrowUpwardIcon />}
        style={{ color: "inherit", fontWeight: "inherit" }}
        {...props}
      >
        Submit
      </Button>
    </Box>
  );
};

const UsernameTextFieldContainer = ({
  currentUser,
}: {
  currentUser: UserAggergation;
}) => {
  const { usernameValidation, formState } = useEditUserForm();
  const { isTaken, isLoading, isValid } = usernameValidation;

  const isCurrentUsersUsername =
    formState.user?.username === currentUser.user.username;

  const isError = (isTaken || !isValid) && !isCurrentUsersUsername;

  const helperText =
    isTaken && !isCurrentUsersUsername
      ? "Username taken"
      : !isValid
      ? "Invalid username"
      : "";

  return (
    <UsernameTextField
      fullWidth
      defaultValue={currentUser.user.username}
      error={isError}
      helperText={helperText}
      isLoading={isLoading}
      onChange={(event) => {
        formState.setUser({
          ...formState.user,
          username: event.target.value,
        });
      }}
    />
  );
};

const EditUserForm = ({
  currentUser,
  onCancel,
}: {
  currentUser: UserAggergation;
  onCancel: () => void;
}) => {
  const { isDisabled, formState } = useEditUserForm();

  useEffect(() => {
    formState.setUser(currentUser.user);
  }, []);

  return (
    <Box p={2}>
      <Hidden smUp>
        <Box display="flex" paddingBottom={2}>
          <CancelButton onClick={onCancel} />
          <Box flex={1} />
          <SubmitButton disabled={isDisabled} />
        </Box>
      </Hidden>
      <Box paddingBottom={2}>
        <UsernameTextFieldContainer currentUser={currentUser} />
      </Box>

      <Hidden xsDown>
        <Box display="flex">
          <Box flex={1} />
          <Box marginRight={2}>
            <CancelButton onClick={onCancel} />
          </Box>
          <SubmitButton disabled={isDisabled} />
        </Box>
      </Hidden>
    </Box>
  );
};

export default (props: { onCancel: () => void }) => {
  return (
    <WithAuthentication
      renderAuthenticated={(currentUser) => (
        <EditUserForm currentUser={currentUser} {...props} />
      )}
    />
  );
};
