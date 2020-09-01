import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemSecondaryAction,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import * as R from "ramda";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import backendAPI from "../backendAPI";

export default () => {
  const inputRef = useRef();
  const [todos, setTodos] = useState({});

  const [error, setError] = useState();
  const query = useQuery(
    ["todos"],
    () => backendAPI.get("/api/todo/").then((res) => res.data),
    {}
  );

  console.log({ todos });

  useEffect(() => {
    if (query.status === "success") {
      const { results } = query.data;
      setTodos(R.indexBy(R.prop("id"), results));
    }
  }, [query.status]);

  const handleAdd = async () => {
    try {
      const res = await backendAPI.post("/api/todo", {
        text: inputRef.current.value,
      });
      const { posted } = res.data;
      setTodos(R.assoc(posted.id, posted));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDelete = (todo) => async () => {
    try {
      await backendAPI.delete(`/api/todo/${todo.id}`);
      setTodos(R.dissoc(todo.id));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const onBlurInput = (todo) => async (e) => {
    try {
      const res = await backendAPI.patch(`/api/todo/${todo.id}`, {
        text: e.target.value,
      });
      const { patched } = res.data;
      setTodos(R.assoc(patched.id, patched));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (query.status === "loading")
    return (
      <Box width="100%" p={2} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (query.status === "error") {
    return "error";
  }

  console.log({ error });

  return (
    <div>
      <Box width="100%" display="flex" paddingX={2}>
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
        <TextField
          error={Boolean(error)}
          helperText={error}
          inputRef={inputRef}
          placeholder="something todo"
          variant="outlined"
          style={{ flex: 1 }}
          onChange={() => setError(null)}
        />
      </Box>
      <List>
        {R.values(todos).map((todo) => (
          <ListItem key={todo.id}>
            <InputBase
              style={{ width: "100%" }}
              onBlur={onBlurInput(todo)}
              defaultValue={todo.text}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={handleDelete(todo)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
