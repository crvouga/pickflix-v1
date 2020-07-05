import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import firebase from "firebase";
import { useSnackbar } from "notistack";

export default (props) => {
  const [user, setUser] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        enqueueSnackbar(`Signed in as ${user.displayName}`, {
          variant: "info",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value} {...props} />;
};
