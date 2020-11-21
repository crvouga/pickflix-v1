import { BoxProps, makeStyles } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import AspectRatio from "../../../common/components/AspectRatio";
import makeImageUrl from "../../../media/tmdb/makeImageUrl";
import { ListAggergation } from "../../query";

const useStyles = makeStyles((theme) => ({
  borderRadius: {
    borderRadius: theme.spacing(1 / 2),
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
  className,
  ...props
}: { posterPath?: string } & BoxProps) => {
  const classesPosterBox = useStylesPosterBox({
    posterSrc: makeImageUrl(2, { posterPath }),
  });

  return (
    <AspectRatio
      ratio={[1, 1]}
      className={clsx(classesPosterBox.poster, className)}
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

export const MovieIconBox = (props: BoxProps) => {
  const classes = useStyles();
  const classesMovieIconBox = useStylesMovieIconBox();
  return (
    <AspectRatio
      ratio={[1, 1]}
      ContentProps={{
        className: clsx(
          classes.borderRadius,
          classesMovieIconBox.iconContainer
        ),
      }}
      {...props}
    >
      <MovieIcon className={classesMovieIconBox.icon} />
    </AspectRatio>
  );
};

export const ListImageBoxSkeleton = (props: BoxProps) => {
  return (
    <AspectRatio
      ratio={[1, 1]}
      ContentProps={{ width: "100%", height: "100%" }}
      {...props}
    >
      <Skeleton width="100%" height="100%" />
    </AspectRatio>
  );
};

export default ({ list, ...props }: { list: ListAggergation } & BoxProps) => {
  const classes = useStyles();

  if (list.listItemCount === 0) {
    return <MovieIconBox className={classes.borderRadius} {...props} />;
  }

  if (list.listItemCount < 4) {
    return (
      <PosterBox
        className={classes.borderRadius}
        posterPath={list.listItems[0].tmdbData.posterPath}
        {...props}
      />
    );
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
        className: classes.borderRadius,
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
