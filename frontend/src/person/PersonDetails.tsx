import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import OpenDiscoverButton from "../discover/OpenDiscoverButton";
import { TagType } from "../discover/query/types";
import makeImageUrl from "../media/tmdb/makeImageUrl";
import { PersonDetailsResponse } from "../media/tmdb/types";

const useStyles = makeStyles(() => ({
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
      <Container maxWidth="md">
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
        <CardActions>
          <OpenDiscoverButton
            tag={{
              type: TagType.withPeople,
              id: details.id,
              name: details.name,
              profilePath: details.profilePath,
            }}
          />
        </CardActions>
      </Container>
    </Card>
  );
};
