import { BoxProps, makeStyles, useTheme } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import AspectRatio from "../common/components/AspectRatio";
import makeImageUrl from "../tmdb/makeImageUrl";
import { ListAggergation } from "./query/types";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  borderRadius: {
    borderRadius: theme.spacing(1),
  },
}));

const useStylesPosterBox = makeStyles((theme) => ({
  poster: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: ({ posterSrc }: { posterSrc: string }) =>
      `url(${posterSrc})`,
  },
}));

const PosterBox = ({
  posterPath,
  ...props
}: { posterPath?: string } & BoxProps) => {
  const classesPosterBox = useStylesPosterBox({
    posterSrc: makeImageUrl(2, { posterPath }),
  });

  return (
    <AspectRatio
      ratio={[1, 1]}
      className={classesPosterBox.poster}
      {...props}
    />
  );
};

const useStylesMovieIconBox = makeStyles((theme) => ({
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.grey[700],
  },
  icon: {
    width: "66%",
    height: "66%",
    color: "black",
  },
}));

const MovieIconBox = (props: BoxProps) => {
  const classesMovieIconBox = useStylesMovieIconBox();
  return (
    <AspectRatio
      ratio={[1, 1]}
      ContentProps={{
        className: classesMovieIconBox.iconContainer,
      }}
      {...props}
    >
      <MovieIcon className={classesMovieIconBox.icon} />
    </AspectRatio>
  );
};

export default ({ list, ...props }: { list: ListAggergation } & BoxProps) => {
  const classes = useStyles();

  if (list.listItemCount === 0) {
    return <MovieIconBox />;
  }

  if (list.listItemCount < 4) {
    return <PosterBox posterPath={list.listItems[0].tmdbData.posterPath} />;
  }

  return (
    <AspectRatio
      ratio={[1, 1]}
      className={classes.borderRadius}
      ContentProps={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      {...props}
    >
      {[...list.listItems, null, null, null, null]
        .slice(0, 4)
        .map((listItem, index) => (
          <React.Fragment key={listItem?.listItem.id || index}>
            {listItem ? (
              <PosterBox
                posterPath={listItem.tmdbData.posterPath}
                width="50%"
              />
            ) : (
              <MovieIconBox width="50%" />
            )}
          </React.Fragment>
        ))}
    </AspectRatio>
  );
};
