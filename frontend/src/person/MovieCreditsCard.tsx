import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { mergeAll } from "ramda";
import React from "react";
import { useHistory } from "react-router";
import ReadMore from "../common/components/ReadMore";
import { useMakeImageUrl } from "../tmdb/makeTMDbImageURL";
import { PersonMovieCredit } from "../tmdb/types";

type Props = {
  credits: PersonMovieCredit[];
};

export default ({ credits }: Props) => {
  const history = useHistory();
  const mergedCredit = mergeAll(credits);

  const sutitle1 = credits
    .map((credit) => ("job" in credit ? credit.job : credit.character))
    .filter((_) => _ && _.length > 0)
    .join(", ");

  const handleClick = () => {
    history.push(`/movie/${mergedCredit.id}`);
  };
  const makeImageUrl = useMakeImageUrl();

  const image = makeImageUrl(
    3,
    mergedCredit.backdropPath
      ? { backdropPath: mergedCredit.backdropPath }
      : { posterPath: mergedCredit.posterPath }
  );
  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardHeader title={mergedCredit.title} subheader={sutitle1} />

        {image && (
          <CardMedia style={{ height: 0, paddingTop: "52%" }} image={image} />
        )}
      </CardActionArea>
      {mergedCredit.overview && mergedCredit.overview.length > 0 && (
        <CardContent>
          <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
          <ReadMore
            TypographyProps={{
              color: "textSecondary",
              variant: "body1",
            }}
            text={mergedCredit.overview}
          />
        </CardContent>
      )}
    </Card>
  );
};
