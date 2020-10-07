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
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/movie/${movie.id}` }));
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
        <CardHeader
          title={movie.title}
          titleTypographyProps={{
            style: { fontWeight: "bold" },
            variant: "body1",
          }}
          subheader={subheader}
          {...CardHeaderProps}
        />
        {image && (
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={image}
          />
        )}
      </CardActionArea>
      {movie.overview && (
        <CardContent>
          <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
          <ReadMore
            TypographyProps={{ color: "textSecondary" }}
            text={movie.overview}
          />
        </CardContent>
      )}
    </Card>
  );
};
