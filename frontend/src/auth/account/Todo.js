import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import * as R from "ramda";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import backendAPI from "../../backendAPI";

export default () => {
  const inputRef = useRef();
  const [todos, setTodos] = useState([]);

  const query = useQuery(
    ["todos"],
    () => backendAPI.get("/api/todo/").then((res) => res.data),
    {}
  );

  useEffect(() => {
    if (query.status === "success") {
      setTodos(query.data.results);
    }
  }, [query.status]);

  const handleAdd = async () => {
    try {
      const res = await backendAPI.post("/api/todo", {
        task: inputRef.current.value,
      });
      setTodos(R.prepend(res.data));
    } catch (error) {}
  };

  const handleDelete = (todo) => async () => {
    try {
      await backendAPI.delete(`/api/todo/${todo.id}`);
      setTodos(R.reject(R.whereEq({ id: todo.id })));
    } catch (error) {}
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

  console.log({ todos });
  return (
    <div>
      <Box width="100%" display="flex" paddingX={2}>
        <TextField
          inputRef={inputRef}
          placeholder="something todo"
          variant="outlined"
          style={{ flex: 1 }}
        />
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.todo_id}>
            <ListItemText primary={todo.task} />
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
