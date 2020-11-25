import { useQueryCurrentUser, UserAggergation } from "../query";

type Node = JSX.Element | null | false;

export default ({
  renderLoading,
  renderError,
  renderAuthenticated,
  renderUnathenticated,
  renderDefault,
}: {
  renderLoading?: () => Node;
  renderError?: () => Node;
  renderAuthenticated?: (currentUser: UserAggergation) => Node;
  renderUnathenticated?: () => Node;
  renderDefault?: () => Node;
}) => {
  const query = useQueryCurrentUser();

  if (query.error && renderError) {
    return renderError() || null;
  }

  if (query.data === undefined && renderLoading) {
    return renderLoading() || null;
  }

  const currentUser = query.data || null;

  if (currentUser === null && renderUnathenticated) {
    return renderUnathenticated() || null;
  }

  if (currentUser && renderAuthenticated) {
    return renderAuthenticated(currentUser) || null;
  }

  if (renderDefault) {
    return renderDefault() || null;
  }

  return null;
};
