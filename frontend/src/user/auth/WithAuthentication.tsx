import React from "react";
import { useQueryCurrentUser, UserAggergation } from "../query";

type Node = JSX.Element | null | false;

export default React.memo(
  ({
    renderLoading,
    renderError,
    renderAuthenticated,
    renderUnathenticated,
  }: {
    renderLoading?: () => Node;
    renderError?: () => Node;
    renderAuthenticated?: (currentUser: UserAggergation) => Node;
    renderUnathenticated?: () => Node;
  }) => {
    const query = useQueryCurrentUser();

    if (query.error !== undefined && renderError) {
      return renderError() || null;
    }

    if (query.data === undefined && renderLoading) {
      return renderLoading() || null;
    }

    const currentUser = query.data;

    if (currentUser === null && renderUnathenticated) {
      return renderUnathenticated() || null;
    }

    if (currentUser && renderAuthenticated) {
      return renderAuthenticated(currentUser) || null;
    }

    return null;
  },
  () => true
);
