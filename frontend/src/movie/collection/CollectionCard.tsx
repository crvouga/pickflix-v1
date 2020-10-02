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
} from "@material-ui/core";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { Collection } from "../../tmdb/types";
import { collectionToBackdropPath } from "./utils";

interface Props {
  collection: Collection;
  onClick: () => void;
}

export default ({ collection, onClick }: Props) => {
  const { name, overview, parts, backdropPath } = collection;

  return (
    <Card>
      <CardHeader title={name} />
      <CardActionArea onClick={onClick}>
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={makeTMDbImageURL(3, {
            backdropPath: collectionToBackdropPath(collection),
          })}
        />
        <CardContent>
          <Typography style={{ fontWeight: "bold" }} gutterBottom>
            Overview
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {overview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
