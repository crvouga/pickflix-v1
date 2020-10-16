import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import ReadMore from "../common/components/ReadMore";
import * as movieUtils from "../movie/utils";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { ImagePaths } from "../tmdb/types";

type Credit = ImagePaths & {
  id: string;
  title: string;
  releaseDate: string;
  overview: string;
};

type Cast = Credit & { character: string };

type Crew = Credit & { job: string; department: string };

export default ({ credit }: { credit: Cast | Credit }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/movie/${credit.id}`);
  };

  const sutitle1 = [movieUtils.toReleaseYear(credit)].join(
    movieUtils.SMALL_DOT
  );

  const image = makeTMDbImageURL(
    3,
    credit.backdropPath
      ? { backdropPath: credit.backdropPath }
      : { posterPath: credit.posterPath }
  );
  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardHeader title={credit.title} subheader={sutitle1} />

        {image && (
          <CardMedia style={{ height: 0, paddingTop: "52%" }} image={image} />
        )}
      </CardActionArea>
      <CardContent>
        <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
        <ReadMore
          text={credit.overview}
          TypographyProps={{
            variant: "body1",
            color: "textSecondary",
          }}
        />
      </CardContent>
    </Card>
  );
};
