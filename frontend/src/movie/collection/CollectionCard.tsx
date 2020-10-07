import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import ReadMore from "../../common/components/ReadMore";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { Collection, CollectionPart } from "../../tmdb/types";
import { toReleaseYear } from "../utils";
import { collectionToBackdropPath } from "./utils";

interface Props {
  collection: Collection;
  onClick: () => void;
}

const releaseYearRange = (parts: CollectionPart[]) => {
  const releaseYears = R.sortBy(
    R.identity,
    parts.map((part) => parseInt(toReleaseYear(part)) || Infinity)
  );

  return `${R.head(releaseYears)} to ${
    R.last(releaseYears) === Infinity ? "Present" : R.last(releaseYears)
  }`;
};

export default ({ collection, onClick }: Props) => {
  const { name, overview, parts } = collection;

  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardHeader
          titleTypographyProps={{
            variant: "h6",
            style: { fontWeight: "bold" },
          }}
          title={name}
          subheader={releaseYearRange(parts)}
        />
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={makeTMDbImageURL(3, {
            backdropPath: collectionToBackdropPath(collection),
          })}
        />
      </CardActionArea>
      {overview.length > 0 && (
        <CardContent>
          <Typography style={{ fontWeight: "bold" }}>Overview</Typography>
          <ReadMore
            text={overview}
            TypographyProps={{ color: "textSecondary", variant: "body1" }}
          />
        </CardContent>
      )}
    </Card>
  );
};
