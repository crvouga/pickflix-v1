import {
  Grid,
  IconButton,
  Box,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
  Collapse,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import axios from "axios";
import * as R from "ramda";
import React, { useEffect, useState } from "react";
import { Flipped, Flipper, spring } from "react-flip-toolkit";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { useHistory, useLocation, useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import ChipSelection from "../common/ChipSelection";
import Footer from "../common/Footer";
import LoadingPage from "../common/LoadingPage";
import MoviePoster from "../movie/MoviePoster";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import * as utils from "../utils";
import ErrorPage from "../common/ErrorPage";
import PersonAvatar from "./PersonAvatar";
import Header from "./Header";
import MoviePosterScroll from "../movie/MoviePosterScroll";
const SwipeableViewsKeyboard = bindKeyboard(SwipeableViews);

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

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    padding: theme.spacing(1),
  },
  details: {
    padding: theme.spacing(1),
  },
  avatar: {
    width: 120,
    height: 120,
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  tile: {
    textAlign: "center",
  },
  poster: {
    width: "100%",
    // maxWidth: "180px",
  },

  chipContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflowX: "auto",
    padding: theme.spacing(1),

    flex: 1,
  },
  bar: {
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "row",
  },
  gridButton: {},

  chip: {
    marginRight: theme.spacing(1),
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    overflowX: "hidden",
  },
  cell: {
    width: "33.33%",
    padding: theme.spacing(0.5),
  },
  poster: {
    width: "100%",
    borderRadius: theme.spacing(1),
  },
  bio: {
    padding: theme.spacing(1),
  },
  list: {},
  listItem: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    textAlign: "left",
    marginBottom: theme.spacing(1),
  },
  listItemImage: {},
  listItemText: {},
  spinnerContainer: {
    textAlign: "center",
    marginTop: theme.spacing(8),
  },
  image: {
    //width: "auto",
    borderRadius: theme.spacing(1),
    margin: "auto",
    height: "240px",
  },
  swipeableViews: {
    textAlign: "center",
  },
}));

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

export default ({ personId }) => {
  const classes = useStyles();
  const history = useHistory();
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
    <div className={classes.root}>
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
        <div className={classes.grid}>
          {visibleCredits.map((credit) => (
            <Flipped flipId={credit.creditId} key={credit.creditId}>
              <div
                className={classes.cell}
                onClick={() => history.push(`/movie/${credit.id}`)}
              >
                <MoviePoster movie={credit} />
              </div>
            </Flipped>
          ))}
        </div>
      </Flipper>

      <Footer />
    </div>
  );
};
