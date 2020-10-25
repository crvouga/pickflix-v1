import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import useAuthForm from "./useAuthForm";

//SOURCE: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default () => {
  const authForm = useAuthForm();
  const refEmail = useRef<HTMLInputElement>();
  const [error, setError] = useState<{ message: string } | undefined>();
  const [disabled, setDisabled] = useState(true);

  const handleCancel = () => {};

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setDisabled(!validateEmail(e.target.value));
    if (error) {
      setError(undefined);
    }
  };

  const handleSubmit = async () => {
    const email = (refEmail.current?.value || "").trim();
    if (validateEmail(email)) {
      authForm.setEmail(email);
      authForm.setStep(await authForm.emailToNextStep(email));
    } else {
      setError({ message: "Invalid email address" });
    }
  };

  return (
    <Box p={2}>
      <Typography gutterBottom variant="h6" style={{ fontWeight: "bold" }}>
        Sign in with email
      </Typography>

      <TextField
        inputRef={refEmail}
        name="email"
        label="Email"
        placeholder="example@email.com"
        fullWidth
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error?.message}
        //
        autoFocus
        //
        type="email"
        autoCorrect="off"
        autoCapitalize="none"
      />

      <Box textAlign="right" marginTop={2} p={2}>
        <Box display="inline-block" marginRight={2}>
          <Button
            color="primary"
            onClick={handleCancel}
            style={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
        </Box>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{ fontWeight: "bold" }}
          disabled={disabled}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
