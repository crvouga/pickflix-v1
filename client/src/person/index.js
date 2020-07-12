import { Box, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import axios from "axios";
import * as R from "ramda";
import React, { useEffect, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { useQuery } from "react-query";
import ChipSelection from "../common/components/ChipSelection";
import Page from "../common/page/Page";
import ErrorPage from "../common/page/ErrorPage";
import Footer from "../common/page/Footer";
import LoadingPage from "../common/page/LoadingPage";
import MoviePoster from "../movie/components/Poster";
import MoviePosterScroll from "../movie/components/PosterScroll";
import Header from "./Header";
import { useParams } from "react-router";

const fetchPersonPage = (personId) =>
  axios
    .get(`/api/tmdb/person/${personId}`, {
      params: {
        appendToResponse: [
          "credits",
          "movie_credits",
          "images",
          "tagged_images",
        ],
      },
    })
    .then((res) => res.data);

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

export default () => {
  const { personId } = useParams();

  const [selectedKey, setSelectedKey] = useState("All");

  const query = useQuery(`/person/${personId}`, () =>
    fetchPersonPage(personId)
  );

  const [sortType, setSortType] = useState("MostPopular");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (newSortType) => () => {
    setSortType(newSortType);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (query.status === "success") {
      setSelectedKey(query.data.knownForDepartment);
    }
  }, [query.status]);

  if (query.status === "loading") {
    return <LoadingPage />;
  }

  if (query.status === "error") {
    return <ErrorPage />;
  }

  const descendPopularity = R.sort(R.descend(R.prop("popularity")));

  const { credits, images, taggedImages, ...details } = query.data;

  const creditsByKey = R.map(descendPopularity, toCreditsByKey(credits));
  const sorter = R.propOr(R.sortBy(R.prop("title")), sortType, sortersByType);
  const visibleCredits = sorter(R.propOr([], selectedKey, creditsByKey));

  const keys = R.sortBy(R.identity, R.keys(creditsByKey));

  return (
    <Page>
      <Header details={details} credits={credits} />
      <Box p={2} component={Typography} style={{ fontWeight: "bold" }}>
        Known For
      </Box>
      <MoviePosterScroll movies={creditsByKey[details.knownForDepartment]} />

      <Box
        p={2}
        paddingBottom={1}
        component={Typography}
        style={{ fontWeight: "bold" }}
      >
        Filmography
      </Box>
      <Box display="flex" flexDirection="row">
        <ChipSelection
          ContainerProps={{ paddingX: 2, paddingY: 1, flex: 1 }}
          chips={keys}
          selected={selectedKey}
          onSelect={setSelectedKey}
        />
        <IconButton style={{ marginRight: 12 }} onClick={handleClick}>
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
          <MenuItem onClick={handleSortSelect("OldestFirst")}>
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

      <Footer />
    </Page>
  );
};
