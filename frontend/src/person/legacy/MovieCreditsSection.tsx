import { Box, Chip, IconButton, Toolbar } from "@material-ui/core";
import GridOffIcon from "@material-ui/icons/GridOff";
import GridOnIcon from "@material-ui/icons/GridOn";
import SortIcon from "@material-ui/icons/Sort";
import { groupBy, mergeAll, thunkify, uniq } from "ramda";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import OpenDiscoverButton from "../../discover/OpenDiscoverButton";
import { TagType } from "../../discover/query/types";
import MovieCard from "../../movie/components/MovieCard";
import Poster from "../../movie/components/MoviePosterCard";
import {
  PersonDetailsResponse,
  PersonMovieCredit,
  PersonMovieCreditsResponse,
} from "../../tmdb/types";
import { personPageUi } from "../redux/person-page-ui";

type Props = {
  credits: PersonMovieCreditsResponse;
  details: PersonDetailsResponse;
};

const toSubheader = (movieCredits: PersonMovieCredit[]) =>
  movieCredits
    .map((credit) => ("job" in credit ? credit.job : credit.character))
    .filter((_) => _ && _.length > 0)
    .join(", ");

const toCreditsById = (credits: PersonMovieCreditsResponse) =>
  groupBy((credit) => credit.id, [
    ...credits.cast.map((credit) => ({ ...credit, department: "Acting" })),
    ...credits.crew.map((credit) => ({
      ...credit,
      department: credit.department || "Crew",
    })),
  ]);

const toDepartments = (credits: PersonMovieCreditsResponse) =>
  uniq([
    ...credits.cast.map(() => "Acting"),
    ...credits.crew.map((credit) => credit.department || "Crew"),
  ]);

export default ({ details, credits }: Props) => {
  const isGridOn = useSelector(personPageUi.selectors.isGridOn);

  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(personPageUi.actions.toggleGrid());
  };

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const handleClickDepartment = (department: string) => {
    setSelectedDepartment(selectedDepartment === department ? "" : department);
  };

  const creditsBytmdbMediaIdEntries = Object.entries(toCreditsById(credits));

  const filtered = creditsBytmdbMediaIdEntries.filter(([id, credits]) =>
    credits.find((credit) => credit.department === selectedDepartment)
  );

  const filteredEntries =
    filtered.length === 0 ? creditsBytmdbMediaIdEntries : filtered;

  return (
    <div>
      <Toolbar>
        <OpenDiscoverButton
          tag={{
            type: TagType.withPeople,
            id: details.id,
            name: details.name,
            profilePath: details.profilePath,
          }}
        />
        <IconButton onClick={handleToggle}>
          {isGridOn ? <GridOffIcon /> : <GridOnIcon />}
        </IconButton>
        <IconButton>
          <SortIcon />
        </IconButton>
      </Toolbar>
      <HorizontalScroll paddingBottom={2} paddingX={2}>
        {toDepartments(credits).map((department) => (
          <Box key={department} marginRight={1}>
            <Chip
              clickable
              onClick={thunkify(handleClickDepartment)(department)}
              style={{ fontWeight: "bold" }}
              label={department}
              variant={
                selectedDepartment === department ? "default" : "outlined"
              }
            />
          </Box>
        ))}
      </HorizontalScroll>
      {isGridOn && (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          paddingX={1 / 2}
        >
          {filteredEntries.map(([tmdbMediaId, movieCredits]) => (
            <Box key={tmdbMediaId} width="50%" p={1 / 2}>
              <Poster movie={mergeAll(movieCredits)} />
            </Box>
          ))}
        </Box>
      )}
      {!isGridOn && (
        <Box paddingX={2}>
          {filteredEntries.map(([tmdbMediaId, movieCredits]) => (
            <Box key={tmdbMediaId} marginBottom={2}>
              <MovieCard
                movie={mergeAll(movieCredits)}
                CardHeaderProps={{ subheader: toSubheader(movieCredits) }}
              />
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};
