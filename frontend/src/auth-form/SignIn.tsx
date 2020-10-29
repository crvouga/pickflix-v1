import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import AvatarUser from "../auth/AvatarUser";
import { useAuth } from "../auth/useAuth";
import { useAuthForm } from "./useAuthForm";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { User } from "../auth/query";

const useStyles = makeStyles((theme) => ({
  avatar: {
    transform: "scale(2)",
  },
}));

export default ({ user }: { user: User }) => {
  const classes = useStyles();

  const auth = useAuth();
  const refPassword = useRef<HTMLInputElement>();
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setDisabled(e.target.value.length <= 2);
  };

  const handleSubmit = async () => {
    const password = refPassword.current?.value || "";
    await auth.signIn({
      emailAddress: user.emailAddress,
      password,
    });
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

      <Box paddingBottom>
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
    </React.Fragment>
  );
};
