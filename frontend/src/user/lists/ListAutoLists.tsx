import { Box } from "@material-ui/core";
import React from "react";
import AutoListCard from "../../list/auto-lists/AutoListCard";
import ListCardSkeleton from "../../list/lists/card/ListCardSkeleton";
import { AutoListAggergation, useQueryAutoLists } from "../../list/query";
import { UserAggergation } from "../query";

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

  const query = useQueryAutoLists({ ownerId: user.user.id });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return (
      <React.Fragment>
        {[...Array(user.autoListCount)].map((_, index) => (
          <Box width="100%" height="100px" key={index} paddingY={1}>
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
          width="100%"
          height="100px"
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
