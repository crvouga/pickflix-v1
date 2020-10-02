import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  CardActions,
  Button,
  makeStyles,
  ButtonBase,
  GridListTile,
} from "@material-ui/core";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { Collection } from "../../tmdb/types";
import { collectionToBackdropPath } from "./utils";
import AspectRatio from "../../common/components/AspectRatio";

interface Props {
  collection: Collection;
  onClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),

    backgroundImage: ({ collection }: Props) =>
      `
        linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        url(${makeTMDbImageURL(4, {
          backdropPath: collectionToBackdropPath(collection),
        })})
      `,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
}));
export default (props: Props) => {
  const { collection, onClick } = props;
  const { name, overview, parts, backdropPath } = collection;
  const classes = useStyles(props);
  return (
    <ButtonBase component="div" onClick={onClick}>
      <AspectRatio ratio={[16, 9]} ContainerProps={{ className: classes.root }}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {overview}
          </Typography>
        </Box>
      </AspectRatio>
    </ButtonBase>
  );
};
