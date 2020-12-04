import { Box, BoxProps, makeStyles } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import AspectRatio from "../../../common/components/AspectRatio";
import makeImageUrl from "../../../media/tmdb/makeImageUrl";
import { ListAggergation } from "../../query";
import classes from "*.module.css";

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
    <Box
      paddingTop="100%"
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
  const classes = useStylesMovieIconBox();
  return (
    <Box paddingTop="100%" position="relative" {...props}>
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        className={classes.iconContainer}
      >
        <MovieIcon className={classes.icon} />
      </Box>
    </Box>
  );
};

export const ListImageBoxSkeleton = (props: BoxProps) => {
  return (
    <Box paddingTop="100%" position="relative" {...props}>
      <Box position="absolute" top={0} left={0} bottom={0} right={0}>
        <Skeleton width="100%" height="100%" />
      </Box>
    </Box>
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
        posterPath={list.listItems[0].tmdbData.posterPath}
        {...props}
      />
    );
  }

  return (
    <Box paddingTop="100%" position="relative" {...props}>
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        {list.listItems.slice(0, 4).map((listItem, index) => (
          <Box key={listItem.listItem.id} width="50%" height="50%">
            <PosterBox
              width="100%"
              height="100%"
              posterPath={listItem.tmdbData.posterPath}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
