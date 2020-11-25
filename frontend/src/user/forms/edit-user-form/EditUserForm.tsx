import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Hidden,
  List,
  TextField,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useEffect } from "react";
import LoadingDialog from "../../../common/components/LoadingDialog";
import useBoolean from "../../../common/hooks/useBoolean";
import { useListener } from "../../../common/utility";
import WithAuthentication from "../../auth/WithAuthentication";
import UserListItem from "../../components/UserListItem";
import {
  MAX_DISPLAY_NAME_LENGTH,
  MAX_USERNAME_LENGTH,
  UserAggergation,
} from "../../query";
import useEditUserForm, { useEditUserFormValidation } from "./useEditUserForm";

const CancelButton = (props: ButtonProps) => {
  return (
    <Button size="large" {...props}>
      Cancel
    </Button>
  );
};

const SubmitButtonContainer = ({
  currentUser,
}: {
  currentUser: UserAggergation;
}) => {
  const { formState, submit } = useEditUserForm();
  const { isDisabled } = useEditUserFormValidation(
    currentUser.user,
    formState.user
  );

  const handleSubmit = () => {
    const { displayName, username, emailAddress } = formState.user;
    submit({
      userId: currentUser.user.id,
      displayName,
      username,
      emailAddress,
    });
  };
  return (
    <Box
      color={isDisabled ? "action.disabled" : "text.primary"}
      fontWeight="bold"
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ArrowUpwardIcon />}
        style={{ color: "inherit", fontWeight: "inherit" }}
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        Submit
      </Button>
    </Box>
  );
};

const TextFieldUsernameContainer = ({
  currentUser,
}: {
  currentUser: UserAggergation;
}) => {
  const { formState } = useEditUserForm();
  const validation = useEditUserFormValidation(
    currentUser.user,
    formState.user
  );
  const { isTaken, isLoading, isValid } = validation.username;

  const isCurrentUsersUsername =
    formState.user?.username === currentUser.user.username;

  const isError =
    (isTaken || !isValid) && !isCurrentUsersUsername && !isLoading;

  const helperText =
    isTaken && !isCurrentUsersUsername && !isLoading
      ? "Username taken"
      : !isValid
      ? "Invalid username"
      : "";

  return (
    <TextField
      label="Username"
      fullWidth
      defaultValue={currentUser.user.username}
      error={isError}
      helperText={helperText}
      onChange={(event) => {
        const newUsername = event.target.value.slice(0, MAX_USERNAME_LENGTH);

        event.target.value = newUsername;

        formState.setUser({
          ...formState.user,
          username: newUsername,
        });
      }}
      InputProps={{
        endAdornment: isLoading ? <CircularProgress size="2em" /> : undefined,
      }}
    />
  );
};

const TextFieldNameContainer = ({
  currentUser,
}: {
  currentUser: UserAggergation;
}) => {
  const { formState } = useEditUserForm();
  const validation = useEditUserFormValidation(
    currentUser.user,
    formState.user
  );
  const { isValid } = validation.displayName;

  const helperText = !isValid
    ? "Invalid name"
    : "Help people search for your account by using the name you're known by.";

  return (
    <TextField
      label="Name"
      fullWidth
      defaultValue={currentUser.user.displayName}
      error={!isValid}
      helperText={helperText}
      onChange={(event) => {
        const newDisplayName = event.target.value.slice(
          0,
          MAX_DISPLAY_NAME_LENGTH
        );

        event.target.value = newDisplayName;

        formState.setUser({
          ...formState.user,
          displayName: newDisplayName,
        });
      }}
    />
  );
};

const TextFieldEmailAddressContainer = ({
  currentUser,
}: {
  currentUser: UserAggergation;
}) => {
  const { formState } = useEditUserForm();
  const validation = useEditUserFormValidation(
    currentUser.user,
    formState.user
  );
  const { isValid, isTaken, isLoading } = validation.emailAddress;

  const helperText = !isValid
    ? "Invalid email address"
    : isTaken
    ? "Email address taken"
    : "";

  return (
    <TextField
      label="Email Address"
      fullWidth
      defaultValue={currentUser.user.emailAddress}
      error={!isValid}
      helperText={helperText}
      onChange={(event) => {
        formState.setUser({
          ...formState.user,
          emailAddress: event.target.value,
        });
      }}
      InputProps={{
        endAdornment: isLoading ? <CircularProgress size="2em" /> : undefined,
      }}
    />
  );
};

const Submitting = () => {
  const { eventEmitter } = useEditUserForm();
  const open = useBoolean(false);
  useListener(eventEmitter, "submit", open.setTrue);
  useListener(eventEmitter, "submitSettled", open.setFalse);
  return (
    <LoadingDialog
      open={open.value}
      ListItemTextProps={{ primary: "Submitting" }}
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
  const { formState } = useEditUserForm();

  useEffect(() => {
    formState.setUser(currentUser.user);
  }, []);

  return (
    <React.Fragment>
      <Submitting />
      <Box p={2}>
        <Hidden smUp>
          <Box display="flex" paddingBottom={2}>
            <CancelButton onClick={onCancel} />
            <Box flex={1} />
            <SubmitButtonContainer currentUser={currentUser} />
          </Box>
        </Hidden>

        <List>
          <UserListItem disabled user={currentUser.user} disableGutters />
        </List>

        <Box paddingBottom={2}>
          <TextFieldUsernameContainer currentUser={currentUser} />
        </Box>
        <Box paddingBottom={2}>
          <TextFieldNameContainer currentUser={currentUser} />
        </Box>
        <Box paddingBottom={4}>
          <TextFieldEmailAddressContainer currentUser={currentUser} />
        </Box>

        <Hidden xsDown>
          <Box display="flex">
            <Box flex={1} />
            <Box marginRight={2}>
              <CancelButton onClick={onCancel} />
            </Box>
            <SubmitButtonContainer currentUser={currentUser} />
          </Box>
        </Hidden>
      </Box>
    </React.Fragment>
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
