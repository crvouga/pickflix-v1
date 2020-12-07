import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
} from "@material-ui/core";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import { uniq, uniqBy } from "ramda";
import React, { ChangeEvent, useState } from "react";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import useBoolean from "../../common/hooks/useBoolean";
import {
  PersonDetailsResponse,
  PersonMovieCredit,
  PersonMovieCreditsResponse,
} from "../../media/tmdb/types";
import MoviePosterGrid from "../../movie/components/MoviePosterGrid";
import PersonCreditsDialog from "./PersonCreditsDialog";
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

const CAST_TAB_INDEX = 0;
const CREW_TAB_INDEX = 1;

export default ({ details, credits }: Props) => {
  const isDialogOpen = useBoolean(false);
  const { cast, crew } = credits;

  const knownForCast =
    (details.knownForDepartment || "acting").toLowerCase() === "acting" &&
    cast.length > 0;

  const [index, setIndex] = useState(
    knownForCast ? CAST_TAB_INDEX : CREW_TAB_INDEX
  );

  const handleChangeIndex = (event: ChangeEvent<{}>, newIndex: number) => {
    setIndex(newIndex);
  };

  const [sortKey, setSortKey] = useState<SortKey>(SortKey.MostPopular);
  const handleChangeSortKey = (event: ChangeEvent<{ value: unknown }>) => {
    setSortKey(event.target.value as SortKey);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [departmentKey, setDepartmentKey] = useState<string | undefined>(
    details.knownForDepartment || undefined
  );
  const departments = uniq(crew.map((credit) => credit.department));
  console.log({ departmentKey });
  const movies = uniqBy(
    (_) => _.id,
    sortBySortKey[sortKey](
      index === 0
        ? cast
        : crew.filter(
            (credit) =>
              !Boolean(departmentKey) ||
              departmentKey === "Acting" ||
              departmentKey === credit.department
          )
    )
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
            variant="fullWidth"
            centered
            value={index}
            onChange={handleChangeIndex}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab disabled={cast.length === 0} label={`Cast · ${cast.length}`} />
            <Tab disabled={crew.length === 0} label={`Crew · ${crew.length}`} />
          </Tabs>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="row-reverse"
        justifyContent="space-between"
        alignItems="center"
        justifyItems="center"
        paddingBottom={1}
      >
        <IconButton onClick={handleClick}>
          <SortOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {Object.entries(SortKey).map(([key, value]) => (
            <MenuItem
              key={key}
              selected={sortKey === value}
              onClick={() => {
                setSortKey(value);
                handleClose();
              }}
            >
              {value}
            </MenuItem>
          ))}
        </Menu>
        {index === CREW_TAB_INDEX && (
          <HorizontalScroll paddingLeft={2}>
            {departments.map((department) => (
              <Box key={department} marginRight={1}>
                <Chip
                  clickable
                  label={department}
                  variant={
                    departmentKey === department ? "default" : "outlined"
                  }
                  onClick={() => {
                    setDepartmentKey((departmentKey) =>
                      departmentKey === department ? undefined : department
                    );
                  }}
                />
              </Box>
            ))}
          </HorizontalScroll>
        )}
      </Box>

      <MoviePosterGrid movies={movies} />
    </React.Fragment>
  );
};
