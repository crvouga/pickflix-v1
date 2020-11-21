import React from "react";
import {
  Typography,
  Box,
  Paper,
  Avatar,
  Card,
  CardContent,
  makeStyles,
  CardActions,
} from "@material-ui/core";
import makeImageUrl from "../media/tmdb/makeImageUrl";
import { PersonDetailsResponse } from "../media/tmdb/types";
import OpenDiscoverButton from "../discover/OpenDiscoverButton";
import { TagType } from "../discover/query/types";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "160px",
    height: "160px",
  },
}));

type Props = {
  details: PersonDetailsResponse;
};

export default ({ details }: Props) => {
  const classes = useStyles();

  const profileUrl = makeImageUrl(3, details);
  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          paddingBottom={2}
        >
          <Avatar className={classes.avatar} src={profileUrl} />
        </Box>
        <Box>
          <Typography variant="h5" align="center">
            {details.name}
          </Typography>
          {details.knownForDepartment && (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              Known For {details.knownForDepartment}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
