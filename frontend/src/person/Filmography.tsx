import {
  Box,
  Chip,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import * as R from "ramda";
import React, { useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import HorizontalScroll from "../common/components/HorizontalScroll";
import MoviePoster from "../movie/components/Poster";
import {
  PersonCredit,
  PersonDetails,
  PersonMovieCredits,
  Movie,
} from "../tmdb/types";

const toCreditsByKey = (credits: PersonMovieCredits) => {
  const { cast, crew } = credits;
  const creditsByKey = R.groupBy((credit) => credit.department || "", crew);

  return creditsByKey;
};

const descendPopularity = R.sort(R.descend(R.prop("popularity")));

const useStylesChip = makeStyles((theme) => ({
  root: {
    fontWeight: "bold",
    fontSize: "1.25em",
  },
}));

interface Props {
  credits: PersonMovieCredits;
  details: PersonDetails;
}

enum SortType {
  MostPopular = "Most Popular",
  NewestFirst = "Newest First",
  OldestFirst = "Oldest First",
}

const sortCredits = (sortType: SortType, credits: PersonCredit[]) => {
  switch (sortType) {
    case SortType.MostPopular:
      return credits;
    case SortType.NewestFirst:
      return credits;
    case SortType.OldestFirst:
      return credits;
    default:
      return credits;
  }
};

export default ({ credits, details }: Props) => {
  const classesChip = useStylesChip();
  const [selectedKey, setSelectedKey] = useState(details.knownForDepartment);
  const [sortType, setSortType] = useState<SortType>(SortType.MostPopular);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSortSelect = (newSortType: SortType) => () => {
    setSortType(newSortType);
    setAnchorEl(null);
  };

  const creditsByKey = toCreditsByKey(credits);

  const visibleCredits = sortCredits(
    sortType,
    R.propOr([], selectedKey, creditsByKey)
  );

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          selected={sortType === SortType.MostPopular}
          onClick={handleSortSelect(SortType.MostPopular)}
        >
          {SortType.MostPopular}
        </MenuItem>
        <MenuItem
          selected={sortType === SortType.NewestFirst}
          onClick={handleSortSelect(SortType.NewestFirst)}
        >
          {SortType.NewestFirst}
        </MenuItem>
        <MenuItem
          selected={sortType === SortType.OldestFirst}
          onClick={handleSortSelect(SortType.OldestFirst)}
        >
          {SortType.OldestFirst}
        </MenuItem>
      </Menu>
      <Box paddingX={2} paddingTop={1} display="flex" flexDirection="row">
        <Typography
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            flex: 1,
            fontWeight: "bold",
          }}
        >
          Filmography
        </Typography>
        <IconButton onClick={handleClick}>
          <TuneIcon />
        </IconButton>
      </Box>

      <HorizontalScroll
        paddingLeft={2}
        paddingY={2}
        width="100%"
        bgcolor="background.default"
        position="sticky"
        top={0}
        zIndex={1}
      >
        {Object.keys(creditsByKey).map((key) => (
          <Box key={key} marginRight={1}>
            <Chip
              label={key}
              clickable
              onClick={() => setSelectedKey(key)}
              variant={key === selectedKey ? "default" : "outlined"}
              classes={classesChip}
            />
          </Box>
        ))}
      </HorizontalScroll>

      <Flipper flipKey={R.join(",", R.pluck("creditId", visibleCredits))}>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {visibleCredits.map((credit) => (
            <Flipped flipId={credit.creditId} key={credit.creditId}>
              <Box width="50%" p={1 / 2}>
                <MoviePoster movie={credit as Movie} width="100%" />
              </Box>
            </Flipped>
          ))}
        </Box>
      </Flipper>
    </React.Fragment>
  );
};
