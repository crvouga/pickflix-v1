import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ErrorBox from "../common/components/ErrorBox";
import LoadingBox from "../common/components/LoadingBox";
import Poster from "../movie/components/MoviePosterCard";
import { getListItems, queryKeys } from "./query";

type Props = {
  listId: string;
};

export default (props: Props) => {
  const { listId } = props;
  const query = useQuery(queryKeys.listItems(listId), () =>
    getListItems({ listId })
  );

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const listItems = query.data;

  if (listItems.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="200px"
      >
        <Typography align="center" color="textSecondary" variant="h6">
          There's nothing here
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {listItems.map((listItem) => (
        <Box p={1 / 2} width="50%" key={listItem.id}>
          <Poster movie={listItem?.tmdbData} />
        </Box>
      ))}
    </Box>
  );
};
