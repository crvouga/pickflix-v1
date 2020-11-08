import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { useDebounce } from "use-debounce/lib";
import { getUsers } from "../users/query";

//copyed from server
const USERNAME_REGEXP = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export default ({ emailAddress }: { emailAddress: string }) => {
  const refUsername = useRef<HTMLInputElement>();
  const history = useHistory();

  const [text, setText] = useState("");
  const [debounced] = useDebounce(text, 200);
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setText(event.target.value);
  };
  const query = useQuery(["username", debounced], () =>
    getUsers({ username: debounced })
  );
  const users = query.data || [];

  const handleSubmit = () => {
    const username = refUsername.current?.value || "";
    history.push(`/auth?emailAddress=${emailAddress}&username=${username}`);
  };

  const isError =
    users.length > 0 || (!USERNAME_REGEXP.test(text) && text.length !== 0);

  const errorMessage =
    users.length > 0
      ? "Username taken"
      : !USERNAME_REGEXP.test(text) && text.length !== 0
      ? "Invalid username"
      : "";

  const disabled = isError || query.status === "loading" || text.length === 0;

  return (
    <React.Fragment>
      <Box paddingBottom={1}>
        <Typography variant="h5" align="center">
          Pick a username
        </Typography>
      </Box>
      <Box paddingBottom={2}>
        <Typography align="center">{emailAddress}</Typography>
      </Box>

      <Box paddingBottom={2}>
        <TextField
          variant="outlined"
          inputRef={refUsername}
          label="Username"
          fullWidth
          autoFocus
          autoCorrect="off"
          autoCapitalize="none"
          onChange={handleChange}
          error={isError}
          helperText={errorMessage}
          InputProps={{
            endAdornment:
              query.status === "loading" ? (
                <CircularProgress size="2em" />
              ) : null,
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        disabled={disabled}
      >
        Pick Username
      </Button>
    </React.Fragment>
  );
};
