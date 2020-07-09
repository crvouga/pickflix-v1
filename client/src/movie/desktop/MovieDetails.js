import {
  Card,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import * as R from "ramda";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import {
  minutesToHoursAndMinutes,
  numberToNumberWithCommas,
  releaseDateToYear,
  voteAverageToFiveStarRating,
} from "../../utils";

const useStyles = makeStyles((theme) => ({
  poster: {
    borderRadius: theme.spacing(1),
    width: "120px",
  },
  mainDetails: {
    marginTop: theme.spacing(2),
  },
  secondaryContent: {
    padding: theme.spacing(1),
  },
  genreChip: {
    marginRight: theme.spacing(1),
  },
}));

export default () => {
  const { id } = useParams();
  const classes = useStyles();
  const detailsQuery = useQuery(
    ["movie", id, "details"],
    () => axios.get(`/api/tmdb/movie/${id}`).then((res) => res.data),
    {}
  );

  if (detailsQuery.status !== "success") {
    return <CircularProgress color="secondary" />;
  }

  const {
    posterPath,
    revenue,
    budget,
    runtime,
    homepage,
    title,
    voteCount,
    voteAverage,
    genres,
    status,
    overview,
    releaseDate,
    productionCountries,
    productionCompanies,
    tagline,
  } = detailsQuery.data;

  const formatedVoteCount = numberToNumberWithCommas(voteCount);
  const formatedRuntime = minutesToHoursAndMinutes(runtime);
  const rating = voteAverageToFiveStarRating(voteAverage);
  const releaseYear = releaseDateToYear(releaseDate || "");

  const seperator = " · ";

  return (
    <div>
      {status !== "Released" && (
        <Typography
          align="center"
          color="secondary"
          variant="h6"
          style={{ fontWeight: "bold" }}
          gutterBottom
        >
          {status}
        </Typography>
      )}
      <Grid
        container
        className={classes.mainDetails}
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <img
            style={{ width: "180px", height: "auto" }}
            src={makeTMDbImageURL(3, { posterPath })}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {R.join(seperator, [releaseYear, formatedRuntime])}
          </Typography>

          <Typography variant="subtitle2" gutterBottom color="textSecondary">
            <Rating defaultValue={rating} precision={0.01} readOnly />
            {` · ${formatedVoteCount} Votes`}
          </Typography>

          <div>
            {genres.map((genre) => (
              <Chip
                size="small"
                variant="outlined"
                key={genre.name}
                className={classes.genreChip}
                label={genre.name}
              />
            ))}
          </div>
        </Grid>
      </Grid>
      <div className={classes.secondaryContent}>
        <Typography
          align="center"
          variant="subtitle1"
          style={{ fontWeight: "bold" }}
        >
          {tagline}
        </Typography>
        <ReactMarkdown className={classes.overview}>{overview}</ReactMarkdown>
        <Typography color="textSecondary" gutterBottom>
          Revenue: ${numberToNumberWithCommas(revenue)}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Budget: ${numberToNumberWithCommas(budget)}
        </Typography>
        <Typography color="textSecondary">Production Countries</Typography>
        {productionCountries.map((productionCountry) => (
          <Chip
            variant="outlined"
            size="small"
            key={productionCountry.name}
            className={classes.genreChip}
            label={productionCountry.name}
          />
        ))}
        <Typography color="textSecondary">Production Companies</Typography>

        {productionCompanies.map((productionCompany) => (
          <Card style={{ margin: 12 }} key={productionCompany.name}>
            <CardHeader
              title={productionCompany.name}
              subheader={productionCompany.originCountry}
            />
            <CardMedia
              style={{ margin: 0, width: 240, height: 100 }}
              image={makeTMDbImageURL(Infinity, productionCompany)}
            />
            {/* <img
              key={productionCompany.name}
              style={{ width: 240, height: "auto" }}
              src={makeTMDbImageURL(Infinity, productionCompany)}
            /> */}
          </Card>
        ))}

        {homepage && (
          <Typography color="textSecondary">
            <a href={homepage} style={{ color: "inherit" }}>
              <LinkIcon />
              Homepage
            </a>
          </Typography>
        )}
      </div>
    </div>
  );
};
