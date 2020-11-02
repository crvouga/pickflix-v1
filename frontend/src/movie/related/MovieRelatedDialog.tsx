import {
  Box,
  Dialog,
  DialogProps,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  AppBar,
  Button,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import LoadingBox from "../../common/components/LoadingBox";
import useInfiniteQueryPagination from "../../common/hooks/useInfiniteQueryPagination";
import MoviePosterGrid, {
  MoviePosterGridSkeleton,
} from "../components/MoviePosterGrid";
import { getMovieSimilar, queryKeys, getMovieRecommendations } from "../query";
import { uniqBy } from "ramda";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
      marginBottom: "60px",
      width: "80%",
    },
  },
}));

const TabPanel = (props: {
  children?: React.ReactNode;
  index: any;
  value: any;
}) => {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index} minHeight="360px">
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </Box>
  );
};

const Similar = ({ tmdbMediaId }: { tmdbMediaId: string }) => {
  const {
    fetchMoreRef,
    data,
    error,
    canFetchMore,
  } = useInfiniteQueryPagination(
    queryKeys.similar({ tmdbMediaId }),
    ({ lastPage }) => getMovieSimilar({ tmdbMediaId, page: lastPage }),
    {}
  );

  if (error) {
    return null;
  }

  if (!data) {
    return <MoviePosterGridSkeleton posterCount={12} />;
  }

  if (data[0] && data[0].results.length === 0) {
    return null;
  }

  const movies = uniqBy(
    (_) => _.id,
    data.flatMap((_) => _.results)
  );

  return (
    <React.Fragment>
      <MoviePosterGrid movies={movies} />
      <div ref={fetchMoreRef} />
      {canFetchMore && <LoadingBox m={6} />}
    </React.Fragment>
  );
};

const Recommendations = ({ tmdbMediaId }: { tmdbMediaId: string }) => {
  const {
    fetchMoreRef,
    data,
    error,
    canFetchMore,
  } = useInfiniteQueryPagination(
    queryKeys.recommendations({ tmdbMediaId }),
    ({ lastPage }) => getMovieRecommendations({ tmdbMediaId, page: lastPage }),
    {}
  );

  if (error) {
    return null;
  }

  if (!data) {
    return <MoviePosterGridSkeleton posterCount={12} />;
  }

  if (data[0] && data[0].results.length === 0) {
    return null;
  }

  const movies = uniqBy(
    (_) => _.id,
    data.flatMap((_) => _.results)
  );

  return (
    <React.Fragment>
      <MoviePosterGrid movies={movies} />
      <div ref={fetchMoreRef} />
      {canFetchMore && <LoadingBox m={6} />}
    </React.Fragment>
  );
};

const close = (props: DialogProps) => {
  if (props.onClose) {
    props.onClose({}, "backdropClick");
  }
};

export default ({
  tmdbMediaId,
  ...props
}: { tmdbMediaId: string } & DialogProps) => {
  const classesDialog = useStylesDialog();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog classes={classesDialog} fullScreen={isMobile} {...props}>
      <AppBar color="default" position="sticky">
        <Box
          display="flex"
          flexDirection="row-reverse"
          paddingX={2}
          paddingY={1}
        >
          {isMobile && (
            <Button onClick={() => close(props)} color="primary" size="large">
              Done
            </Button>
          )}
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="Similar" />
          <Tab label="Recommendations" />
        </Tabs>
      </AppBar>
      <Box paddingY={1}>
        <TabPanel index={0} value={value}>
          <Similar tmdbMediaId={tmdbMediaId} />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Recommendations tmdbMediaId={tmdbMediaId} />
        </TabPanel>
      </Box>
    </Dialog>
  );
};
