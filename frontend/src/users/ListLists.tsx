import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ListCard from "../lists/card/ListCard";
import ListCardSkeleton from "../lists/card/ListCardSkeleton";
import { getUsersLists, ListAggergation, queryKeys } from "../lists/query";
import { UserAggergation } from "./query";

export default ({
  user,
  onClick,
}: {
  onClick?: (list: ListAggergation) => void;
  user: UserAggergation;
}) => {
  const handleClick = (list: ListAggergation) => {
    if (onClick) {
      onClick(list);
    }
  };

  const query = useQuery(queryKeys.userLists(user.user), () =>
    getUsersLists(user.user)
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return (
      <React.Fragment>
        {[...Array(user.reviewCount)].map((_, index) => (
          <Box key={index} width="100%" height="100px" paddingY={1}>
            <ListCardSkeleton />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const lists = query.data.results;

  if (lists.length === 0) {
    return (
      <Box m={6} display="flex" justifyContent="center" alignItems="center">
        <Typography color="textSecondary">No lists</Typography>
      </Box>
    );
  }

  return (
    <React.Fragment>
      {lists.map((list) => (
        <Box
          width="100%"
          height="100px"
          key={list.list.id}
          paddingY={1}
          onClick={() => handleClick(list)}
        >
          <ListCard list={list} />
        </Box>
      ))}
    </React.Fragment>
  );
};
