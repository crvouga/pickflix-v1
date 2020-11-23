import React, { useState } from "react";
import { TextField, TextFieldProps, CircularProgress } from "@material-ui/core";
import { useQueryUsers } from "../../query";
import { useDebounce } from "use-debounce/lib";

const NameField = React.forwardRef((props: TextFieldProps, ref) => {
  return <TextField inputRef={ref} {...props} />;
});

export const UsernameField = React.forwardRef((props: TextFieldProps, ref) => {
  const [username, setUsername] = useState("");
  const [debouncedUsername] = useDebounce(username, 200);
  const query = useQueryUsers({
    username: debouncedUsername,
  });

  const usersWithUsername = query.data ?? [];

  return (
    <TextField
      inputRef={ref}
      onChange={(event) => {
        setUsername(event.target.value);
      }}
      error={usersWithUsername.length > 0}
      helperText={
        usersWithUsername.length > 0 ? "Username is already being used" : ""
      }
      InputProps={{
        endAdornment: (
          <React.Fragment>
            {query.status === "loading" && <CircularProgress size="1.75em" />}
          </React.Fragment>
        ),
      }}
      {...props}
    />
  );
});

export default () => {
  return <React.Fragment></React.Fragment>;
};
