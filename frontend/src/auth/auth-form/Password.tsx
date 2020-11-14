import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useRef, useState } from "react";
import AvatarUser from "../../users/AvatarUser";
import { User } from "../../users/query";
import { useAuth } from "../useAuth";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  avatar: {
    transform: "scale(2)",
  },
}));

export default ({ user }: { user: User }) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();
  const refPassword = useRef<HTMLInputElement>();
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setDisabled(e.target.value.length <= 2);
  };

  const handleForgotPassword = () => {
    history.push(
      `/auth?emailAddress=${user.emailAddress}&forgotPasswordFlag=1`
    );
  };

  const handleSubmit = async () => {
    const password = refPassword.current?.value || "";
    try {
      await auth.signIn({
        emailAddress: user.emailAddress,
        password,
      });
    } catch (error) {
      if (error?.response?.status === 400) {
        setPasswordError("Incorrect Password");
      } else {
      }
    }
  };

  return (
    <React.Fragment>
      <Box paddingBottom={4} display="flex" justifyContent="center">
        <AvatarUser className={classes.avatar} user={user} />
      </Box>

      <Box paddingBottom={2}>
        <Typography align="center">{user.emailAddress}</Typography>
      </Box>

      <Box paddingBottom={2}>
        <TextField
          variant="outlined"
          inputRef={refPassword}
          type={showPassword ? undefined : "password"}
          name="password"
          label="Password"
          fullWidth
          onChange={handleChange}
          autoFocus
          autoComplete="on"
          error={Boolean(passwordError)}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((_) => !_)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box paddingBottom={2}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          disabled={disabled}
        >
          Sign In
        </Button>
      </Box>
      <Box
        paddingBottom={2}
        display="flex"
        flexDirection="row-reverse"
        color="text.secondary"
      >
        <Button
          size="small"
          color="inherit"
          onClick={handleForgotPassword}
          variant="text"
        >
          Forgot Password?
        </Button>
      </Box>
    </React.Fragment>
  );
};
