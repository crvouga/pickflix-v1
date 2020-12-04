import { CircularProgress, TextField, Zoom, Box } from "@material-ui/core";
import { Autocomplete, AutocompleteProps } from "@material-ui/lab";
import React, { useState } from "react";
import UserListItem from "../../../user/components/UserListItem";
import { User } from "../../../user/query";
import { useQuerySearchUsers } from "../../../search/query";
import ChipUser from "../../../user/components/ChipUser";

type AutoCompeleteUsersProps = {
  users: User[];
  isLoading?: boolean;
  onTextChanged: (text: string) => void;
  selectedUsers: User[];
  onSelectedUsersChanged: (users: User[]) => void;
};
const noop = () => {};

const AutoCompeleteUsers = ({
  users,
  isLoading,
  onTextChanged,
  selectedUsers,
  onSelectedUsersChanged,
}: AutoCompeleteUsersProps) => {
  return (
    <Autocomplete
      options={users}
      multiple
      freeSolo={false}
      getOptionLabel={(option) => option.username}
      onInputChange={(event, input) => {
        onTextChanged(input);
      }}
      // value={selectedUsers}
      // onChange={(event, value) => {

      //   // onSelectedUsersChanged(value);
      // }}

      renderTags={(tags, getTagProps) => {
        return (
          <React.Fragment>
            {tags.map((user, index) => (
              <Box key={user.id}>
                <Zoom in>
                  <ChipUser
                    onClick={noop}
                    user={user}
                    {...getTagProps({ index })}
                  />
                </Zoom>
              </Box>
            ))}
          </React.Fragment>
        );
      }}
      renderOption={(option) => {
        return <UserListItem disabled user={option} />;
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            autoFocus
            variant="outlined"
            label="Add Users"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        );
      }}
    />
  );
};

export const AutoCompeleteUsersContainer = () => {
  const selectedUsers: User[] = [];
  const setSelectedUsers = (selectedUsers: User[]) => {};

  const [text, setText] = useState("");

  const query = useQuerySearchUsers({
    text,
  });

  const users = query.data?.flatMap((page) => page.results) || [];

  return (
    <AutoCompeleteUsers
      users={users}
      onTextChanged={setText}
      onSelectedUsersChanged={setSelectedUsers}
      selectedUsers={selectedUsers}
    />
  );
};
