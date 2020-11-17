import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ListCard from "../lists/lists/card/ListCard";
import ListCardSkeleton from "../lists/lists/card/ListCardSkeleton";
import { getUsersLists, ListAggergation, queryKeys } from "../lists/query";
import { UserAggergation } from "./query";
import { useQueryCurrentUser } from "./useCurrentUser";
import ListCardCallToAction from "../lists/lists/card/ListCardCallToAction";
import useCreateListForm from "../lists/forms/create-list-form/useCreateListForm";
import useModal from "../navigation/modals/useModal";

export default ({
  user,
  onClick,
}: {
  onClick?: (list: ListAggergation) => void;
  user: UserAggergation;
}) => {
  const createListFormModal = useModal("CreateListForm");
  const handleClick = (list: ListAggergation) => {
    if (onClick) {
      onClick(list);
    }
  };

  const queryCurrentUser = useQueryCurrentUser();
  const query = useQuery(queryKeys.userLists(user.user), () =>
    getUsersLists(user.user)
  );

  if (query.error) {
    return null;
  }

  if (query.data === undefined || queryCurrentUser.data === undefined) {
    return (
      <React.Fragment>
        {[...Array(user.listCount)].map((_, index) => (
          <Box key={index} width="100%" height="100px" paddingY={1}>
            <ListCardSkeleton />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const currentUser = queryCurrentUser.data;
  const lists = query.data.results;

  if (lists.length === 0) {
    if (currentUser && user.user.id === currentUser.user.id) {
      return (
        <Box width="100%" paddingY={1}>
          <ListCardCallToAction
            onClick={createListFormModal.open}
            title="Make a list"
            subtitle="Keep track of movie you like or want to watch"
          />
        </Box>
      );
    }
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
          key={list.list.id}
          width="100%"
          height="100px"
          paddingY={1}
          onClick={() => handleClick(list)}
        >
          <ListCard list={list} />
        </Box>
      ))}
    </React.Fragment>
  );
};
