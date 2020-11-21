import { Avatar, Box, BoxProps, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useHistory } from "react-router";
import AspectRatio from "../common/components/AspectRatio";
import makeImageUrl from "../media/tmdb/makeImageUrl";

const useStyles = makeStyles((theme) => ({
  avatar: {
    border: `solid ${theme.palette.grey[800]} 1px`,
    width: "100%",
    height: "100%",
  },
}));

type Props = BoxProps & {
  person: { profilePath: string; id: string };
};

export default ({ person, ...restOfProps }: Props) => {
  const { profilePath } = person;
  const classes = useStyles();

  const profileURL = makeImageUrl(2, { profilePath });
  const history = useHistory();
  const handleClick = () => {
    history.push(`/person/${person.id}`);
  };

  return (
    <Box onClick={handleClick} width="100%" {...restOfProps}>
      <AspectRatio ratio={[1, 1]}>
        <Avatar className={classes.avatar} src={profileURL} />
      </AspectRatio>
    </Box>
  );
};
