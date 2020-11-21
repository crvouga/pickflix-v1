import { useQueryCurrentUser, UserAggergation } from "../query";

export default ({
  renderAuthenticated,
  renderUnathenticated,
}: {
  renderAuthenticated?: (
    currentUser: UserAggergation
  ) => JSX.Element | null | false;
  renderUnathenticated?: () => JSX.Element | null | false;
}) => {
  const query = useQueryCurrentUser();

  if (query.error !== undefined || query.data === undefined) {
    return null;
  }

  const currentUser = query.data;

  if (currentUser === null) {
    return renderUnathenticated ? renderUnathenticated() || null : null;
  }

  return renderAuthenticated ? renderAuthenticated(currentUser) || null : null;
};
