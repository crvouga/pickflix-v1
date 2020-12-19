import { Box, CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import useModal from "../../../app/modals/useModal";
import NonFullscreenResponsiveDialog from "../../../common/components/NonFullscreenResponsiveDialog";
import MovieListItem from "../../../movie/components/MovieListItem";
import { MovieResult, useQuerySearchMovies } from "../../../search/query";
import { MediaId, TmdbMediaType } from "../../../media/tmdb/types";
import { useAddListItemMutation } from "../../query";
import { SlideDown } from "../../../common/components/TransitionComponents";

type AutoCompeleteUsersProps = {
  results: MovieResult[];
  isLoading?: boolean;
  onTextChanged: (text: string) => void;
  onSelected: (result: MovieResult) => void;
};
const noop = () => {};

const AutoCompeleteMovies = ({
  results,
  isLoading,
  onTextChanged,
  onSelected,
}: AutoCompeleteUsersProps) => {
  return (
    <Autocomplete
      options={results}
      multiple={false}
      freeSolo={false}
      getOptionLabel={(option) => option.title}
      onChange={(event, value) => {
        if (value) {
          onSelected(value);
        }
      }}
      renderOption={(option) => {
        return <MovieListItem disabled movie={option} />;
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            autoFocus
            variant="outlined"
            label="Add Movie"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            onChange={(event) => {
              onTextChanged(event.target.value);
            }}
          />
        );
      }}
    />
  );
};

export const AddListItemFormModal = ({ listId }: { listId: string }) => {
  const { close, isOpen } = useModal("AddListItemForm");
  const addListItemMutation = useAddListItemMutation();
  const [text, setText] = useState("");
  const query = useQuerySearchMovies({
    text,
  });

  const results = query.data?.flatMap((page) => page.results) || [];

  return (
    <NonFullscreenResponsiveDialog
      TransitionComponent={SlideDown}
      open={isOpen}
      onClose={close}
    >
      <Box p={2}>
        <AutoCompeleteMovies
          isLoading={query.isLoading}
          results={results}
          onTextChanged={setText}
          onSelected={async (result) => {
            const mediaId: MediaId = {
              tmdbMediaId: Number(result.id),
              tmdbMediaType: TmdbMediaType.movie,
            };
            close();
            await addListItemMutation({
              listId,
              mediaId,
            });
          }}
        />
      </Box>
    </NonFullscreenResponsiveDialog>
  );
};
