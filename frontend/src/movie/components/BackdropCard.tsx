import {
  Card,
  CardHeader,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import makeImageUrl from "../../tmdb/makeImageUrl";

type Props = {
  movie: {
    title: string;
    backdropPath?: string;
    posterPath?: string;
    releaseDate: string;
    overview: string;
  };
  onClick: () => void;
};

export default ({ movie, onClick }: Props) => {
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardHeader
          title={movie.title}
          titleTypographyProps={{
            style: { fontWeight: "bold" },
            variant: "body1",
          }}
          subheader={moment(movie.releaseDate).format("YYYY")}
        />
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={makeImageUrl(
            3,
            movie.backdropPath
              ? { backdropPath: movie.backdropPath }
              : { posterPath: movie.posterPath }
          )}
        />
      </CardActionArea>
    </Card>
  );
};
