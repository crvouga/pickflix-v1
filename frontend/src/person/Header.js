import { Box, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import * as R from "ramda";
import React from "react";
import ExpandHeight from "../common/components/ExpandHeight";
import Markdown from "../common/components/Markdown";
import useBoolean from "../common/hooks/useBoolean";
import PersonAvatar from "./PersonAvatar";

const toYear = (_) => moment(_).format("YYYY");

export default ({ details, credits }) => {
  const isBioExpanded = useBoolean(false);

  const allCredits = R.concat(credits.crew, credits.cast);
  const allMovies = R.uniqBy(R.prop("id"), allCredits);

  const [oldestMovie, newestMovie] = R.compose(
    R.juxt([R.head, R.last]),
    R.sortBy((_) => moment(_.releaseDate).format("YYYYMMDD")),
    R.reject(R.where({ releaseDate: R.isEmpty }))
  )(allMovies);

  const creditsByDepartment = R.groupBy(R.prop("department"), credits.crew);
  creditsByDepartment.Acting = credits.cast;

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={0}>
        <Box display="flex" flexDirection="row" marginBottom={1}>
          <PersonAvatar person={details} width="120px" marginRight={2} />
          <Box>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {details.name}
            </Typography>
            <Typography component="div">
              <Box component="span" color="text.secondary">
                Movies
              </Box>{" "}
              <Box fontWeight="bold" component="span">
                {allMovies.length}
              </Box>
            </Typography>
            <Typography component="div">
              <Box component="span" color="text.secondary">
                Credits
              </Box>{" "}
              <Box fontWeight="bold" component="span">
                {allCredits.length}
              </Box>
            </Typography>
            <Typography component="div">
              <Box component="span" color="text.secondary">
                Active
              </Box>{" "}
              <Box fontWeight="bold" component="span">
                {toYear(oldestMovie.releaseDate)} -{" "}
                {toYear(newestMovie.releaseDate)}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      {details.biography && (
        <Box
          paddingX={2}
          textAlign="left"
          display="flex"
          flexDirection="column"
        >
          <Box width="100%" display="flex" flexDirection="row">
            <Typography style={{ fontWeight: "bold", flex: 1 }}>
              Biography
            </Typography>
          </Box>
          <ExpandHeight
            in={isBioExpanded.value}
            collapsedHeight="8em"
            onClick={isBioExpanded.toggle}
          >
            <Markdown>{details.biography}</Markdown>
          </ExpandHeight>
        </Box>
      )}
    </React.Fragment>
  );
};
