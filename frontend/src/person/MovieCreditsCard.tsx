import {
  Box,
  ListItemText,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
  List,
  ListItem,
  CardActions,
  IconButton,
  Collapse,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import * as movieUtils from "../movie/utils";
import { actions } from "../redux";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { ImagePaths, PersonMovieCredit } from "../tmdb/types";
import ReadMore from "../common/components/ReadMore";
import MovieIcon from "@material-ui/icons/Movie";
import { mergeAll } from "ramda";
import ExpandIcon from "../common/components/ExpandIcon";
import useBoolean from "../common/hooks/useBoolean";

type Props = {
  credits: PersonMovieCredit[];
};

export default ({ credits }: Props) => {
  const expanded = useBoolean(false);
  const dispatch = useDispatch();

  const mergedCredit = mergeAll(credits);

  const sutitle1 = credits
    .map((credit) => ("job" in credit ? credit.job : credit.character))
    .filter((_) => _ && _.length > 0)
    .join(", ");

  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/movie/${mergedCredit.id}` }));
  };

  const image = makeTMDbImageURL(
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
