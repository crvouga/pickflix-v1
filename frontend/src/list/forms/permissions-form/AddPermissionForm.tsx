import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Zoom,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import useModal from "../../../app/modals/useModal";
import NonFullscreenResponsiveDialog from "../../../common/components/NonFullscreenResponsiveDialog";
import { SlideLeft } from "../../../common/components/TransitionComponents";
import { useQuerySearchUsers } from "../../../search/query";
import ChipUser from "../../../user/components/ChipUser";
import UserListItem from "../../../user/components/UserListItem";
import { User } from "../../../user/query";
import { ListAggergation, useAddEditorsMutation } from "../../query";
import { SubmitButton } from "../../../common/components/SubmitButton";
import LoadingDialog from "../../../common/components/LoadingDialog";
import useBoolean from "../../../common/hooks/useBoolean";

type AutoCompeleteUsersProps = {
  users: User[];
  isLoading?: boolean;
  onTextChanged: (text: string) => void;

  onSelectedUsersChanged: (users: User[]) => void;
};
const noop = () => {};

const AutoCompeleteUsers = ({
  users,
  isLoading,
  onTextChanged,
  onSelectedUsersChanged,
}: AutoCompeleteUsersProps) => {
  return (
    <Autocomplete
      options={users}
      multiple
      freeSolo={false}
      getOptionLabel={(option) => option.username}
      onInputChange={(_1, input) => {
        onTextChanged(input);
      }}
      onChange={(_1, value) => {
        onSelectedUsersChanged(value);
      }}
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

export const AddPermissionFormModal = ({ list }: { list: ListAggergation }) => {
  const isLoading = useBoolean(false);
  const { isOpen, close } = useModal("AddPermissionForm");
  const mutate = useAddEditorsMutation();
  const [text, setText] = useState("");
  const query = useQuerySearchUsers({
    text,
  });
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const submit = async () => {
    try {
      isLoading.setTrue();
      await mutate({
        listId: list.list.id,
        editorIds: selectedUsers.map((user) => user.id),
      });
      close();
    } catch (error) {
    } finally {
      isLoading.setFalse();
    }
  };

  const users = query.data?.flatMap((page) => page.results) || [];

  return (
    <React.Fragment>
      <NonFullscreenResponsiveDialog
        TransitionComponent={SlideLeft}
        open={isOpen}
        onClose={close}
      >
        <Box p={2}>
          <AutoCompeleteUsers
            users={users}
            onTextChanged={setText}
            onSelectedUsersChanged={setSelectedUsers}
            isLoading={query.isLoading}
          />

          <Box paddingTop={2} display="flex" justifyContent="space-between">
            <Button size="large" onClick={close}>
              Cancel
            </Button>
            <SubmitButton
              disabled={selectedUsers.length === 0}
              onClick={submit}
            >
              Add
            </SubmitButton>
          </Box>
        </Box>
      </NonFullscreenResponsiveDialog>
      <LoadingDialog
        open={isLoading.value}
        ListItemTextProps={{ primary: "Adding" }}
      />
    </React.Fragment>
  );
};
