import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardHeaderProps,
  CardMedia,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import ReadMore from "../../common/components/ReadMore";
import { useMakeImageUrl } from "../../tmdb/makeTMDbImageURL";

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

const movieToSubheader = (movie: Movie) =>
  moment(movie.releaseDate).isValid()
    ? moment(movie.releaseDate).format("YYYY")
    : undefined;

export default ({ movie, CardHeaderProps }: Props) => {
  const history = useHistory();
  const makeImageUrl = useMakeImageUrl();
  const image = makeImageUrl(
    3,
    movie.backdropPath
      ? { backdropPath: movie.backdropPath }
      : { posterPath: movie.posterPath }
  );
  const handleClick = () => {
    history.push(`/movie/${movie.id}`);
  };

  const subheader = movieToSubheader(movie);

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          title={movie.title}
          subheader={CardHeaderProps?.subheader || subheader}
        />
        {image && (
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={image}
          />
        )}
      </CardActionArea>

      <CardContent>
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
