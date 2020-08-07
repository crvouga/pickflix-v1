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
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import backendAPI from "../../backendAPI";

const makeTodo = (description) => ({
  id: uuidv4(),
  description,
});

export default () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const query = useQuery(
    ["todos"],
    () => backendAPI.get("/api/todo/").then((res) => res.data),
    {}
  );

  useEffect(() => {
    if (query.status === "success") {
      setTodos(query.data.todos);
    }
  }, [query.status]);

  const handleAdd = async () => {
    setTodos(R.prepend(makeTodo(value)));
    const response = await backendAPI.post("/api/todo", { description: value });
  };

  const handleDelete = (todo) => () => {
    setTodos(R.without([todo]));
  };

  const handleChange = (e, newValue) => {
    setValue(e.target.value);
  };
  if (query.status === "loading")
    return (
      <Box width="100%" p={2} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (query.status === "error") return "error";

  return (
    <div>
      <Box width="100%" display="flex" paddingX={2}>
        <TextField
          value={value}
          onChange={handleChange}
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
          <ListItem key={todo.id}>
            <ListItemText primary={todo.description} />
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
