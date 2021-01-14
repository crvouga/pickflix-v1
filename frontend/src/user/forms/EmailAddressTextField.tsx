import { CircularProgress, TextField, TextFieldProps } from "@material-ui/core";
import React, { useState } from "react";
import { useDebounce } from "use-debounce/lib";
import { isValidEmailAddress, useQueryUsers } from "../query";

type Props = {
  currentEmailAddress?: string;
};

type EmailAddressTextFieldState = {
  emailAddress: string;
  setEmailAddress: (newEmailAddress: string) => void;
  isError: boolean;
  isLoading: boolean;
  isValid: boolean;
  TextFieldProps: TextFieldProps;
};

const useIsEmailAddressTaken = (emailAddress: string) => {
  const [debounced] = useDebounce(emailAddress, 1000 / 3);
  const query = useQueryUsers({
    emailAddress: debounced,
  });
  const user = query.data?.results?.[0]?.user || undefined;
  const isTaken = Boolean(user);
  const isLoading = query.status === "loading";

  return {
    isTaken,
    isLoading,
  };
};

export const useEmailAddressTextFieldState = ({
  currentEmailAddress = "",
}: Props): EmailAddressTextFieldState => {
  const [emailAddress, setEmailAddress] = useState(currentEmailAddress);

  const { isTaken, isLoading } = useIsEmailAddressTaken(emailAddress);

  const isValid = isValidEmailAddress(emailAddress);

  const isCurrentEmailAddress = emailAddress === currentEmailAddress;

  const isError = (isTaken || !isValid) && !isCurrentEmailAddress && !isLoading;

  const helperText =
    isTaken && !isCurrentEmailAddress && !isLoading
      ? "Email taken"
      : !isValid
      ? "Invalid email"
      : "";

  const onChange = (event: React.ChangeEvent<{ value: string }>) => {
    const newEmailAddress = event.target.value.slice(0, 100);
    event.target.value = newEmailAddress;
    setEmailAddress(newEmailAddress);
  };

  return {
    emailAddress,
    setEmailAddress,

    isError,
    isLoading,
    isValid,

    TextFieldProps: {
      onChange,
      helperText,
      defaultValue: currentEmailAddress,
    },
  };
};

export const EmailAddressTextField = ({
  state,
}: {
  state: EmailAddressTextFieldState;
}) => {
  const { isError, isLoading, TextFieldProps } = state;

  return (
    <TextField
      label="Email"
      fullWidth
      error={isError}
      InputProps={{
        endAdornment: isLoading ? <CircularProgress size="2em" /> : undefined,
      }}
      {...TextFieldProps}
    />
  );
};
