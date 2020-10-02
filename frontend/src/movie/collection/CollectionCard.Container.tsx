import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { actions } from "../../redux";
import backendAPI from "../../backendAPI";
import { Collection } from "../../tmdb/types";
import CollectionCard from "./CollectionCard";

interface Props {
  collection: {
    id: string;
  };
}

export default ({ collection: { id: collectionId } }: Props) => {
  const dispatch = useDispatch();

  const query = useQuery<Collection, string>(
    ["collection", collectionId].join(""),
    () =>
      backendAPI
        .get(`/api/tmdb/collection/${collectionId}`)
        .then((res) => res.data),
    {}
  );

  if (query.status === "error") {
    return null;
  }

  if (query.status === "loading") {
    return null;
  }

  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/collection/${collectionId}` }));
  };

  const collection = query.data;

  return (
    <Box marginX={2}>
      <CollectionCard collection={collection} onClick={handleClick} />
    </Box>
  );
};
