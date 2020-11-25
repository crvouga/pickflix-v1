import { Box, Typography } from "@material-ui/core";
import React from "react";
import ListCard from "../../list/lists/card/ListCard";
import ListCardCallToAction from "../../list/lists/card/ListCardCallToAction";
import ListCardListSkeleton from "../../list/lists/card/ListCardListSkeleton";
import { ListAggergation, useQueryLists } from "../../list/query";
import useModal from "../../app/modals/useModal";
import { UserAggergation } from "../query";
import { useQueryCurrentUser } from "../query/hooks";

const ListCardListEmpty = () => {
  return (
    <Box m={6} display="flex" justifyContent="center" alignItems="center">
      <Typography color="textSecondary">No lists</Typography>
    </Box>
  );
};

const ListCardList = ({
  lists,
  onClick,
}: {
  lists: ListAggergation[];
  onClick: (list: ListAggergation) => void;
}) => {
  return (
    <React.Fragment>
      {lists.map((list) => (
        <Box
          key={list.list.id}
          width="100%"
          height="100px"
          paddingY={1}
          onClick={() => {
            onClick(list);
          }}
        >
          <ListCard list={list} />
        </Box>
      ))}
    </React.Fragment>
  );
};

/*



*/

const ListListsCurrentUser = ({
  currentUser,
  onClick,
}: {
  currentUser: UserAggergation;
  onClick: (list: ListAggergation) => void;
}) => {
  const query = useQueryLists({});
  const createListFormModal = useModal("CreateListForm");

  if (query.error) {
    return null;
  }

  if (query.data === undefined) {
    return <ListCardListSkeleton count={currentUser.listCount} />;
  }

  if (query.data[0].results.length === 0) {
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

  return <ListCardList onClick={onClick} lists={query.data[0].results} />;
};

/*



*/

const ListListsUser = ({
  user,
  onClick,
}: {
  user: UserAggergation;
  onClick: (list: ListAggergation) => void;
}) => {
  const query = useQueryLists({
    ownerId: user.user.id,
  });

  if (query.error) {
    return null;
  }
  if (query.data === undefined) {
    return <ListCardListSkeleton count={user.listCount} />;
  }
  if (query.data.length === 0) {
    return <ListCardListEmpty />;
  }
  return <ListCardList onClick={onClick} lists={query.data[0].results} />;
};

/* 



*/

export default ({
  user,
  onClick,
}: {
  onClick: (list: ListAggergation) => void;
  user: UserAggergation;
}) => {
  const query = useQueryCurrentUser();

  if (query.error) {
    return null;
  }
  if (query.data === undefined) {
    return <ListCardListSkeleton count={user.listCount} />;
  }

  const currentUser = query.data;

  if (currentUser && user.user.id === currentUser.user.id) {
    return <ListListsCurrentUser currentUser={currentUser} onClick={onClick} />;
  }

  return <ListListsUser user={user} onClick={onClick} />;
};
