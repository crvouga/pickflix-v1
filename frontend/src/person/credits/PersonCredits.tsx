import { Box, MenuItem, Select, Tab, Tabs } from "@material-ui/core";
import { ascend, descend, sort, uniqBy } from "ramda";
import React, { ChangeEvent, useState } from "react";
import useBoolean from "../../common/hooks/useBoolean";
import MoviePosterGrid from "../../movie/components/MoviePosterGrid";
import {
  PersonDetailsResponse,
  PersonMovieCredit,
  PersonMovieCreditsResponse,
} from "../../media/tmdb/types";
import PersonCreditsDialog from "./PersonCreditsDialog";
import moment from "moment";

const TabPanel = (props: {
  children?: React.ReactNode;
  index: any;
  value: any;
}) => {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index}>
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </Box>
  );
};

type Props = {
  details: PersonDetailsResponse;
  credits: PersonMovieCreditsResponse;
};

enum SortKey {
  MostPopular = "Most Popular",
  DateAddedOldest = "Date Added (Oldest)",
  DateAddedNewest = "Date Added (Newest)",
}

const sortBySortKey = {
  [SortKey.MostPopular]: (credits: PersonMovieCredit[]) =>
    credits.slice().sort((a, b) => b.popularity - a.popularity),

  [SortKey.DateAddedNewest]: (credits: PersonMovieCredit[]) =>
    credits
      .slice()
      .sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      ),

  [SortKey.DateAddedOldest]: (credits: PersonMovieCredit[]) =>
    credits
      .slice()
      .sort(
        (a, b) =>
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      ),
};

export default ({ details, credits }: Props) => {
  const isDialogOpen = useBoolean(false);
  const { cast, crew } = credits;

  const knownForCast =
    (details.knownForDepartment || "acting").toLowerCase() === "acting" &&
    cast.length > 0;

  const [index, setIndex] = useState(knownForCast ? 0 : 1);

  const handleChangeIndex = (event: ChangeEvent<{}>, newIndex: number) => {
    setIndex(newIndex);
  };

  const [sortKey, setSortKey] = useState<SortKey>(SortKey.MostPopular);
  const handleChangeSortKey = (event: ChangeEvent<{ value: unknown }>) => {
    setSortKey(event.target.value as SortKey);
  };

  const movies = uniqBy(
    (_) => _.id,
    sortBySortKey[sortKey](index === 0 ? cast : crew)
  );

  return (
    <React.Fragment>
      <PersonCreditsDialog
        credits={credits}
        open={isDialogOpen.value}
        onClose={isDialogOpen.setFalse}
      />
      <Box display="flex" flexWrap="wrap">
        <Box flex={1} paddingRight={4} p={2}>
          <Tabs
            value={index}
            onChange={handleChangeIndex}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab disabled={cast.length === 0} label={`Cast · ${cast.length}`} />
            <Tab disabled={crew.length === 0} label={`Crew · ${crew.length}`} />
          </Tabs>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Select
            variant="outlined"
            value={sortKey}
            onChange={handleChangeSortKey}
            autoWidth
          >
            {Object.entries(SortKey).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <MoviePosterGrid movies={movies} />
    </React.Fragment>
  );
};
