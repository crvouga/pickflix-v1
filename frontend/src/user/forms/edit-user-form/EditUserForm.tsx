import { Box, Button, ButtonProps, Hidden } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React from "react";
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

export default ({
  currentUser,
  onCancel,
}: {
  currentUser: UserAggergation;
  onCancel: () => void;
}) => {
  const { usernameValidation, isDisabled, formState } = useEditUserForm();

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
        <UsernameTextField
          fullWidth
          defaultValue={formState.user?.username}
          error={
            usernameValidation.isInvalid &&
            (formState.user?.username || "").length > 0
          }
          helperText={usernameValidation.helperText}
          isLoading={usernameValidation.isLoading}
          onChange={(event) => {
            formState.setUser({
              ...formState.user,
              username: event.target.value,
            });
          }}
        />
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
