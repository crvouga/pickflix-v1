import {
  Box,
  ButtonBase,
  Chip,
  Collapse,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import * as R from "ramda";
import React from "react";
import ReactMarkdown from "react-markdown";
import ExpandIcon from "../common/components/ExpandIcon";
import useBoolean from "../common/hooks/useBoolean";
import PersonAvatar from "./PersonAvatar";

const useStyles = makeStyles((theme) => ({
  fadeBottom: {
    "mask-image": "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
}));

const toYear = (_) => moment(_).format("YYYY");

export default ({ details, credits }) => {
  const classes = useStyles();
  const isBioExpanded = useBoolean(false);

  const allCredits = R.concat(credits.crew, credits.cast);
  const allMovies = R.uniqBy(R.prop("id"), allCredits);

  const [oldestMovie, newestMovie] = R.compose(
    R.juxt([R.head, R.last]),
    R.sort(R.ascend(R.pipe(R.prop("releaseDate"), (_) => new Date(_))))
  )(allMovies);

  const creditsByDepartment = R.groupBy(R.prop("department"), credits.crew);
  creditsByDepartment["Acting"] = credits.cast;
  const departmentFrequencies = R.map(R.length, creditsByDepartment);

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={0}>
        <Box display="flex" flexDirection="row" marginBottom={2}>
          <PersonAvatar
            person={details}
            // TODO fix this
            minWidth="120px"
            maxWidth="120px"
            minHeight="120px"
            maxHeight="120px"
            marginRight={2}
          />
          <Box>
            <Typography variant="h5">{details.name}</Typography>
            <Typography color="textSecondary" variant="subtitle1">
              Movies {allMovies.length}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              Years Active {toYear(oldestMovie.releaseDate)} -{" "}
              {toYear(newestMovie.releaseDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
      {details.biography && (
        <Box
          onClick={isBioExpanded.toggle}
          p={2}
          textAlign="left"
          display="flex"
          flexDirection="column"
          className={clsx({ [classes.fadeBottom]: !isBioExpanded.value })}
        >
          <Box width="100%" display="flex" flexDirection="row">
            <Typography style={{ fontWeight: "bold", flex: 1 }}>
              Biography
            </Typography>
            <ExpandIcon expanded={isBioExpanded.value} />
          </Box>
          <Collapse in={isBioExpanded.value} collapsedHeight="10em">
            <Box marginTop={-2}>
              <Typography component="div" color="textSecondary" varaint="body2">
                <ReactMarkdown>{details.biography}</ReactMarkdown>
              </Typography>
            </Box>
          </Collapse>
        </Box>
      )}
    </React.Fragment>
  );
};
