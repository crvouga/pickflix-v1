import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import backendAPI from "../../backendAPI";
import { actions } from "../../redux";
import { Collection } from "../../tmdb/types";
import CollectionCard from "./CollectionCard";
import { useMoviePageQuery } from "../data";

const fetchCollection = async (collectionId: string) => {
  const { data } = await backendAPI.get<Collection>(
    `/api/tmdb/collection/${collectionId}`
  );
  return data;
};

type CollectionSectionProps = {
  collection: {
    id: string;
  };
};

const CollectionSection = ({
  collection: { id: collectionId },
}: CollectionSectionProps) => {
  const dispatch = useDispatch();

  const query = useQuery(`/collection/${collectionId}`, () =>
    fetchCollection(collectionId)
  );

  if (query.error || !query.data) {
    return null;
  }

  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/collection/${collectionId}` }));
  };

  const collection = query.data;

  return (
    <Box m={2}>
      <CollectionCard collection={collection} onClick={handleClick} />
    </Box>
  );
};

export default () => {
  const query = useMoviePageQuery();
  if (!query.data) {
    return null;
  }

  const { belongsToCollection } = query.data;

  if (belongsToCollection) {
    return <CollectionSection collection={belongsToCollection} />;
  }

  return null;
};
