import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

type Props = {
  onClick?: () => void;
  title?: string;
  subtitle?: string;
};

export default (props: Props) => {
  const {
    title = "You're not signed in",
    subtitle = "Signing in allows you to use all the features!",
  } = props;

  const history = useHistory();

  const onClick = Boolean(props.onClick)
    ? props.onClick
    : () => {
        history.push("/auth");
      };

  return (
    <Card onClick={onClick}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" align="center">
            {title}
          </Typography>
          <Box paddingBottom={1}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              {subtitle}
            </Typography>
          </Box>
          <Box color="text.primary" fontWeight="bold">
            <Button
              color="primary"
              variant="contained"
              size="large"
              style={{ color: "inherit", fontWeight: "inherit" }}
              fullWidth
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
