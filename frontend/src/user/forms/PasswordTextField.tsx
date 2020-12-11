import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useRef, useState, useEffect } from "react";

type PasswordTextFieldState = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;

  isValid: boolean;
  TextFieldProps: TextFieldProps;
};

export const usePasswordTextFieldState = (): PasswordTextFieldState => {
  const refPassword = useRef<HTMLInputElement>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setPassword(e.target.value);
  };

  const isValid = password.length > 0;

  return {
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isError,
    setIsError,
    helperText,
    setHelperText,
    isValid,
    TextFieldProps: {
      inputRef: refPassword,
      onChange: handleChange,
    },
  };
};

type PasswordRepeatTextFieldState = {
  passwordRepeat: string;
  setPasswordRepeat: React.Dispatch<React.SetStateAction<string>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isValid: boolean;
  TextFieldProps: TextFieldProps;
};

export const usePasswordRepeatTextFieldState = (
  passwordTextFieldState: PasswordTextFieldState
): PasswordRepeatTextFieldState => {
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [helperText, setHelperText] = useState("");

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setPasswordRepeat(e.target.value);
  };

  const isValid =
    passwordRepeat.length > 0 &&
    passwordRepeat === passwordTextFieldState.password;

  useEffect(() => {
    if (passwordRepeat !== passwordTextFieldState.password) {
      setHelperText("Must match password");
    }
  }, [passwordTextFieldState.password]);

  return {
    passwordRepeat,
    setPasswordRepeat,
    helperText,
    setHelperText,
    isValid,

    showPassword: passwordTextFieldState.showPassword,
    setShowPassword: passwordTextFieldState.setShowPassword,
    TextFieldProps: {
      onChange: handleChange,
    },
  };
};

export const PasswordRepeatTextField = ({
  state,
}: {
  state: PasswordRepeatTextFieldState;
}) => {
  return (
    <TextField
      variant="outlined"
      type={state.showPassword ? undefined : "password"}
      name="password"
      label="Password"
      fullWidth
      autoFocus
      autoComplete="on"
      helperText={state.helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() =>
                state.setShowPassword((showPassword) => !showPassword)
              }
            >
              {state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...state.TextFieldProps}
    />
  );
};

export const PasswordTextField = ({
  state,
}: {
  state: PasswordTextFieldState;
}) => {
  return (
    <TextField
      variant="outlined"
      type={state.showPassword ? undefined : "password"}
      name="password"
      label="Password"
      fullWidth
      autoFocus
      autoComplete="on"
      error={state.isError}
      helperText={state.helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() =>
                state.setShowPassword((showPassword) => !showPassword)
              }
            >
              {state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...state.TextFieldProps}
    />
  );
};
