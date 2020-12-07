import {
  Box,
  Button,
  DialogProps,
  Paper,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { AppBarGutter } from "../../common/components/AppBarGutter";
import {
  ResponsiveDialog,
  RESPONSIVE_DIALOG_MAX_WIDTH,
} from "../../common/components/ResponsiveDialog";
import MoviePosterGridInfinite from "../components/MoviePosterGridInfinite";
import { getMovieRecommendations, getMovieSimilar, queryKeys } from "../query";

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
  return (
    <MoviePosterGridInfinite
      queryKey={queryKeys.similar({ tmdbMediaId })}
      queryFn={({ page }) => getMovieSimilar({ tmdbMediaId, page })}
    />
  );
};

const Recommendations = ({ tmdbMediaId }: { tmdbMediaId: string }) => {
  return (
    <MoviePosterGridInfinite
      queryKey={queryKeys.recommendations({ tmdbMediaId })}
      queryFn={({ page }) => getMovieRecommendations({ tmdbMediaId, page })}
    />
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ResponsiveDialog {...props}>
      <Box
        zIndex={2}
        component={Paper}
        position="fixed"
        width="100%"
        maxWidth={RESPONSIVE_DIALOG_MAX_WIDTH}
      >
        {isMobile && (
          <Box
            display="flex"
            flexDirection="row-reverse"
            paddingX={2}
            paddingY={1}
          >
            <Button onClick={() => close(props)} color="primary" size="large">
              Done
            </Button>
          </Box>
        )}
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
      </Box>
      {isMobile && <AppBarGutter />}
      <AppBarGutter />
      <Box paddingY={1}>
        <TabPanel index={0} value={value}>
          <Similar tmdbMediaId={tmdbMediaId} />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Recommendations tmdbMediaId={tmdbMediaId} />
        </TabPanel>
      </Box>
    </ResponsiveDialog>
  );
};
