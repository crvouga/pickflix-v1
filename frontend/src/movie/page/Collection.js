import { Box, Typography, Divider } from "@material-ui/core";
import backendAPI from "../../backendAPI";
import React from "react";
import { useQuery } from "react-query";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import Backdrop from "../components/Backdrop";
import ExpandHeight from "../../common/components/ExpandHeight";
import useBoolean from "../../common/hooks/useBoolean";

export default ({ details }) => {
  const { belongsToCollection } = details;

  if (!belongsToCollection) {
    return null;
  }

  const isOverviewExpanded = useBoolean(false);

  const { id: collectionId } = belongsToCollection;
  const query = useQuery(
    ["collection", collectionId],
    () =>
      collectionId &&
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

  const { name, overview, parts } = query.data;

  return (
    <React.Fragment>
      <Box padding={2}>
        <Typography style={{ fontWeight: "bold" }}>{name}</Typography>
        {overview && (
          <ExpandHeight
            collapsedHeight="10em"
            in={isOverviewExpanded.value}
            onClick={isOverviewExpanded.toggle}
          >
            <Typography gutterBottom color="textSecondary" variant="body1">
              {overview}
            </Typography>
          </ExpandHeight>
        )}
      </Box>

      <HorizontalScroll paddingLeft={2} paddingBottom={2}>
        {parts.map((part) => (
          <Box key={part.id} marginRight={1} width={240}>
            <Backdrop movie={part} />
            <Typography color="textSecondary">{part.title}</Typography>
          </Box>
        ))}
      </HorizontalScroll>
      <Divider />
    </React.Fragment>
  );
};
