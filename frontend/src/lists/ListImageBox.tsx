import { BoxProps, makeStyles, useTheme } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import AspectRatio from "../common/components/AspectRatio";
import makeImageUrl from "../tmdb/makeImageUrl";
import { ListAggergation } from "./query/types";

const useStylesPosterBox = makeStyles((theme) => ({
  poster: {
    backgroundSize: "cover",
    backgroundImage: ({ posterSrc }: { posterSrc: string }) =>
      `url(${posterSrc})`,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.grey[300],
  },
}));

const PosterBox = ({
  posterPath,
  ...props
}: { posterPath?: string } & BoxProps) => {
  const classes = useStylesPosterBox({
    posterSrc: makeImageUrl(2, { posterPath }),
  });

  return <AspectRatio ratio={[1, 1]} className={classes.poster} {...props} />;
};

const useStylesMovieIconBox = makeStyles((theme) => ({
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.grey[600],
  },
}));

const MovieIconBox = (props: BoxProps) => {
  const classes = useStylesMovieIconBox();
  return (
    <AspectRatio
      ratio={[1, 1]}
      ContentProps={{
        className: classes.iconContainer,
      }}
      {...props}
    >
      <MovieIcon style={{ width: "66%", height: "66%", color: "black" }} />
    </AspectRatio>
  );
};

export default ({ list, ...props }: { list: ListAggergation } & BoxProps) => {
  if (list.listItems.length === 0) {
    return <MovieIconBox {...props} />;
  }

  if (list.listItems.length < 4) {
    const listItem = list.listItems[0];
    return (
      <PosterBox
        width="100%"
        posterPath={listItem.tmdbData.posterPath}
        {...props}
      />
    );
  }

  return (
    <AspectRatio
      ratio={[1, 1]}
      ContentProps={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      {...props}
    >
      {list.listItems.slice(0, 4).map((listItem) => (
        <PosterBox posterPath={listItem.tmdbData.posterPath} width="50%" />
      ))}
    </AspectRatio>
  );
};
