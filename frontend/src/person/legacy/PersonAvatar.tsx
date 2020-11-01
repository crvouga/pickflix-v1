import { Avatar, Box, BoxProps, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useHistory } from "react-router";
import AspectRatio from "../../common/components/AspectRatio";
import { useMakeImageUrl } from "../../tmdb/makeTMDbImageURL";
import { Person } from "../../tmdb/types";

const useStyles = makeStyles((theme) => ({
  avatar: {
    border: `solid ${theme.palette.grey[800]} 1px`,
    width: "100%",
    height: "100%",
  },
}));

interface Props extends BoxProps {
  person: { profilePath: string } & Partial<Person>;
  skeleton?: boolean;
}

export default ({ person, skeleton, ...restOfProps }: Props) => {
  const { profilePath } = person;
  const classes = useStyles();
  const makeImageUrl = useMakeImageUrl();
  const profileURL = makeImageUrl(2, { profilePath });
  const history = useHistory();
  const handleClick = () => {
    history.push(`/person/${person.id}`);
  };

  return (
    <Box onClick={handleClick} {...restOfProps}>
      <AspectRatio ratio={[1, 1]}>
        {!skeleton && <Avatar className={classes.avatar} src={profileURL} />}

        {skeleton && (
          <Skeleton
            variant="circle"
            animation="wave"
            width="100%"
            height="100%"
          />
        )}
      </AspectRatio>
    </Box>
  );
};
