import { Collapse, makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { capitalize } from "../../utils";
import { authForm } from "./redux/auth-form";
import useAuthForm from "./useAuthForm";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
}));

const codeToTitle = (code: string) =>
  code.split("/")?.[code.length - 1]?.split("-")?.map(capitalize)?.join(" ") ||
  "";

export default () => {
  const classes = useStyles();
  const { error } = useAuthForm();

  return (
    <Collapse in={Boolean(error)}>
      <Alert classes={classes} severity="error" variant="outlined">
        <AlertTitle>{codeToTitle(error?.code || "")}</AlertTitle>
        {error?.message || ""}
      </Alert>
    </Collapse>
  );
};
