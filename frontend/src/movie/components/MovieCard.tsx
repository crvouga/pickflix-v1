import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardHeaderProps,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import ReadMore from "../../common/components/ReadMore";
import { useDispatch } from "react-redux";
import { actions } from "../../redux";
import { useHistory } from "react-router";

type Movie = {
  id: string;
  title: string;
  backdropPath?: string;
  posterPath?: string;
  releaseDate: string;
  overview: string;
};

type Props = {
  movie: Movie;
  CardHeaderProps?: CardHeaderProps;
};

export default ({ movie, CardHeaderProps }: Props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/movie/${movie.id}`);
  };

  const subheader = moment(movie.releaseDate).isValid()
    ? moment(movie.releaseDate).format("YYYY")
    : undefined;

  const image = makeTMDbImageURL(
    3,
    movie.backdropPath
      ? { backdropPath: movie.backdropPath }
      : { posterPath: movie.posterPath }
  );

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        {image && (
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={image}
          />
        )}
      </CardActionArea>

      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography gutterBottom variant="subtitle1" color="textSecondary">
          {CardHeaderProps?.subheader || subheader}
        </Typography>

        {movie.overview && (
          <React.Fragment>
            <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
            <ReadMore
              TypographyProps={{ color: "textSecondary" }}
              text={movie.overview}
            />
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
};
