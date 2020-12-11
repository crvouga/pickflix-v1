import { Box, BoxProps, makeStyles } from "@material-ui/core";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
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
    <Box
      paddingTop="100%"
      className={clsx(classesPosterBox.poster, className)}
      {...props}
    />
  );
};

export const ListCardImageIconWrapperBox = ({
  children,
  ...props
}: BoxProps) => {
  return (
    <Box paddingTop="100%" position="relative" {...props}>
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {children}
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
    return (
      <ListCardImageIconWrapperBox {...props}>
        <MovieCreationOutlinedIcon
          style={{
            width: "66%",
            height: "66%",
          }}
        />
      </ListCardImageIconWrapperBox>
    );
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
