import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import * as R from "ramda";
import React, { useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import api from "../api";
import HorizontalScroll from "../common/components/HorizontalScroll";
import MoviePoster from "../movie/components/Poster";

const toCreditsByKey = (credits) => {
  const { cast, crew } = credits;
  const creditsByKey = R.groupBy(R.prop("department"), crew);
  if (cast.length > 0) creditsByKey["Acting"] = cast;
  if (R.keys(creditsByKey) > 1) creditsByKey["All"] = R.concat(cast, crew);
  return creditsByKey;
};

const sortersByType = {
  MostPopular: R.sort(R.descend(R.propOr(0, "popularity"))),
  NewestFirst: R.sort(
    R.descend(R.pipe(R.prop("releaseDate"), (_) => new Date(_)))
  ),
  OldestFirst: R.sort(
    R.ascend(R.pipe(R.prop("releaseDate"), (_) => new Date(_)))
  ),
};

const descendPopularity = R.sort(R.descend(R.prop("popularity")));

export default ({ credits, details }) => {
  const [selectedKey, setSelectedKey] = useState(details.knownForDepartment);
  const [sortType, setSortType] = useState("MostPopular");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSortSelect = (newSortType) => () => {
    setSortType(newSortType);
    setAnchorEl(null);
  };

  const creditsByKey = R.map(descendPopularity, toCreditsByKey(credits));
  const sorter = R.propOr(R.sortBy(R.prop("title")), sortType, sortersByType);
  const visibleCredits = sorter(R.propOr([], selectedKey, creditsByKey));
  const keys = R.sortBy(R.identity, R.keys(creditsByKey));

  return (
    <React.Fragment>
      <Box
        paddingX={2}
        paddingTop={1}
        component={Typography}
        style={{ fontWeight: "bold" }}
      >
        Filmography
      </Box>
      <Box
        bgcolor="background.default"
        display="flex"
        flexDirection="row"
        position="sticky"
        top={0}
        zIndex={1}
      >
        <HorizontalScroll paddingX={2} paddingY={2} flex={1}>
          {keys.map((key) => (
            <Box key={key} marginRight={1}>
              <Chip
                label={key}
                clickable
                onClick={() => setSelectedKey(key)}
                variant={key === selectedKey ? "default" : "outlined"}
              />
            </Box>
          ))}
        </HorizontalScroll>

        <IconButton onClick={handleClick}>
          <TuneIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            selected={sortType === "MostPopular"}
            onClick={handleSortSelect("MostPopular")}
          >
            Most Popular
          </MenuItem>
          <MenuItem
            selected={sortType === "NewestFirst"}
            onClick={handleSortSelect("NewestFirst")}
          >
            Newest First
          </MenuItem>
          <MenuItem
            selected={sortType === "OldestFirst"}
            onClick={handleSortSelect("OldestFirst")}
          >
            Oldest First
          </MenuItem>
        </Menu>
      </Box>

      <Flipper flipKey={R.join(",", R.pluck("creditId", visibleCredits))}>
        <Box
          display="flex"
          flexDirection="row"
          overflowx="hidden"
          flexWrap="wrap"
        >
          {visibleCredits.map((credit) => (
            <Flipped flipId={credit.creditId} key={credit.creditId}>
              <MoviePoster movie={credit} width="33.33%" />
            </Flipped>
          ))}
        </Box>
      </Flipper>
    </React.Fragment>
  );
};
