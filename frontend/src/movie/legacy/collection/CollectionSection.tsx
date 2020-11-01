import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { BackendAPI } from "../../../backend-api";
import { Collection } from "../../../tmdb/types";
import { useMoviePageQuery } from "../../data";
import CollectionCard from "./CollectionCard";

const fetchCollection = async (collectionId: string) => {
  const { data } = await BackendAPI.get<Collection>(
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
  const history = useHistory();

  const query = useQuery(`/collection/${collectionId}`, () =>
    fetchCollection(collectionId)
  );

  if (query.error || !query.data) {
    return null;
  }

  const handleClick = () => {
    history.push(`/collection/${collectionId}`);
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
