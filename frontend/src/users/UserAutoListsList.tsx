import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import AutoListCard from "../lists/auto-lists/AutoListCard";
import { ListCardSkeleton } from "../lists/ListCard";
import {
  AutoListAggergation,
  getUsersAutoLists,
  queryKeys,
} from "../lists/query";
import { UserAggergation } from "./query";
import { range } from "ramda";

export default ({
  user,
  onClick,
}: {
  onClick?: (list: AutoListAggergation) => void;
  user: UserAggergation;
}) => {
  const handleClick = (list: AutoListAggergation) => {
    if (onClick) {
      onClick(list);
    }
  };

  const query = useQuery(
    queryKeys.userAutoLists({ username: user.user.username }),
    () => getUsersAutoLists({ username: user.user.username })
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return (
      <React.Fragment>
        {range(0, user.autoListCount).map((n) => (
          <Box key={n} paddingY={1}>
            <ListCardSkeleton />
          </Box>
        ))}
      </React.Fragment>
    );
  }

  const autoListsByKey = query.data;

  return (
    <React.Fragment>
      {Object.entries(autoListsByKey).map(([autoListKey, autoList]) => (
        <Box
          key={autoListKey}
          paddingY={1}
          onClick={() => handleClick(autoList)}
        >
          <AutoListCard autoList={autoList} />
        </Box>
      ))}
    </React.Fragment>
  );
};
