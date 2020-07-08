import {
  CircularProgress,
  Fade,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
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
import useMakeImageUrl from "../tmdb/useMakeImageUrl";
import ChipSelection from "../common/ChipSelection";
import PageHistory from "../common/PageHistory";
import MoviePoster from "../movie/MoviePoster";
import * as utils from "../utils";
import LoadingPage from "../common/LoadingPage";

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

const onElementAppear = (el, index) => {
  spring({
    onUpdate: (val) => {
      el.style.opacity = val;
    },
  });
};

const onExit = (el, index, removeElement) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: (val) => {
      el.style.opacity = 1 - val;
    },
    onComplete: removeElement,
  });

  return () => {
    el.style.opacity = "";
    removeElement();
  };
};
export default () => {
  const classes = useStyles();
  const history = useHistory();
  const makeImageUrl = useMakeImageUrl();
  const [selectedKey, setSelectedKey] = useState("All");
  const [index, setIndex] = useState(0);
  const handleIndexChange = (e, newIndex) => setIndex(newIndex);
  const location = useLocation();
  const { personId } = useParams();
  const query = useQuery(location.pathname, () => fetchPersonPage(personId));

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
    return "error";
  }

  const descendPopularity = R.sort(R.descend(R.prop("popularity")));

  const { credits, images, taggedImages, ...details } = query.data;
  const allImages = descendPopularity(
    R.concat(images.profiles, taggedImages.results)
  );
  const { knownForDepartment, biography, placeOfBirth, name } = details;
  const birthday = utils.numberDateToWordDate(details.birthday) || "-";
  const deathday = utils.numberDateToWordDate(details.deathday) || "-";
  const age = utils.getAge(details.birthday);

  const creditsByKey = R.map(descendPopularity, toCreditsByKey(credits));
  const sorter = R.propOr(R.sortBy(R.prop("title")), sortType, sortersByType);
  const visibleCredits = sorter(R.propOr([], selectedKey, creditsByKey));

  const keys = R.sortBy(R.identity, R.keys(creditsByKey));

  const stickyStyles = {
    position: "sticky",
    top: utils.getElementBottom(document.getElementById("app-bar")),
  };

  const subtitle1 = [
    knownForDepartment ? knownForDepartment : false,
    details.birthday && !details.deathday ? `${age} years old` : false,
    `${R.length(R.concat(credits.cast, credits.crew))} credits`,
  ]
    .filter(R.identity)
    .join(" · ");

  const profileURL = makeImageUrl(2, details);

  return (
    <Fade in>
      <div className={classes.root}>
        <div className={classes.header}>
          <SwipeableViewsKeyboard
            className={classes.swipeableViews}
            value={index}
            onChange={handleIndexChange}
          >
            {allImages.map((image, i) => (
              <img
                className={classes.image}
                key={image.filePath}
                src={makeImageUrl(3, { profilePath: image.filePath })}
              />
            ))}
          </SwipeableViewsKeyboard>

          <Typography align="left" variant="h6">
            {name}
          </Typography>
          <Typography align="left" color="textSecondary" variant="subtitle1">
            {subtitle1}
          </Typography>
        </div>

        <div className={classes.bar} style={stickyStyles}>
          <ChipSelection
            keys={keys}
            selectedKey={selectedKey}
            onChipClick={setSelectedKey}
            style={{ flex: 1 }}
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
        </div>

        <Flipper flipKey={R.join(",", R.pluck("creditId", visibleCredits))}>
          <div className={classes.grid}>
            {visibleCredits.map((credit) => (
              <Flipped
                flipId={credit.creditId}
                key={credit.creditId}
                // onAppear={onElementAppear}
                // onExit={onExit}
              >
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
        <div className={classes.details}>
          <Grid item container xs>
            <Grid item xs>
              <Typography>Birthday</Typography>
              <Typography gutterBottom color="textSecondary">
                {birthday}
              </Typography>
            </Grid>

            <Grid item xs>
              <Typography>Deathday</Typography>
              <Typography gutterBottom color="textSecondary">
                {deathday}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs>
            <Grid item xs>
              <Typography>Place of Birth</Typography>
              <Typography gutterBottom color="textSecondary">
                {placeOfBirth}
              </Typography>
            </Grid>

            <Grid item xs>
              <Typography>Known For</Typography>
              <Typography gutterBottom color="textSecondary">
                {knownForDepartment}
              </Typography>
            </Grid>
          </Grid>
          <ReactMarkdown>{biography}</ReactMarkdown>
        </div>
        <PageHistory />
      </div>
    </Fade>
  );
};
