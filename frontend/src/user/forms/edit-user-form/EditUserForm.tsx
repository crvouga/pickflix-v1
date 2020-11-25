import { Box, Button, ButtonProps, Hidden, List } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React from "react";
import LoadingDialog from "../../../common/components/LoadingDialog";
import useBoolean from "../../../common/hooks/useBoolean";
import { useListener } from "../../../common/utility";
import WithAuthentication from "../../auth/WithAuthentication";
import UserListItem from "../../components/UserListItem";
import { UserAggergation } from "../../query";
import {
  DisplayNameTextField,
  useDisplayNameTextFieldState,
} from "../DisplayNameTextField";
import {
  EmailAddressTextField,
  useEmailAddressTextFieldState,
} from "../EmailAddressTextField";
import {
  UsernameTextField,
  useUsernameTextFieldState,
} from "../UsernameTextField";
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
  const usernameTextFieldState = useUsernameTextFieldState({
    currentUsername: currentUser.user.username,
  });

  const displayNameTextFieldState = useDisplayNameTextFieldState({
    currentDisplayName: currentUser.user.displayName,
  });

  const emailAddressTextFieldState = useEmailAddressTextFieldState({
    currentEmailAddress: currentUser.user.emailAddress,
  });

  const isDisabled =
    usernameTextFieldState.isError ||
    displayNameTextFieldState.isError ||
    emailAddressTextFieldState.isError;

  const { submit } = useEditUserForm();

  const handleSubmit = () => {
    const userId = currentUser.user.id;
    const { username } = usernameTextFieldState;
    const { displayName } = displayNameTextFieldState;
    const { emailAddress } = emailAddressTextFieldState;
    submit({
      userId,
      username,
      displayName,
      emailAddress,
    });
  };

  return (
    <React.Fragment>
      <Submitting />
      <Box p={2}>
        <Hidden smUp>
          <Box display="flex" paddingBottom={2}>
            <CancelButton onClick={onCancel} />
            <Box flex={1} />
            <SubmitButton disabled={isDisabled} onClick={handleSubmit} />
          </Box>
        </Hidden>

        <List>
          <UserListItem disabled user={currentUser.user} disableGutters />
        </List>

        <Box paddingBottom={2}>
          <UsernameTextField state={usernameTextFieldState} />
        </Box>
        <Box paddingBottom={2}>
          <DisplayNameTextField state={displayNameTextFieldState} />
        </Box>
        <Box paddingBottom={4}>
          <EmailAddressTextField state={emailAddressTextFieldState} />
        </Box>

        <Hidden xsDown>
          <Box display="flex">
            <Box flex={1} />
            <Box marginRight={2}>
              <CancelButton onClick={onCancel} />
            </Box>
            <SubmitButton disabled={isDisabled} onClick={handleSubmit} />
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
