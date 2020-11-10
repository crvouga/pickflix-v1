import { useQueryCurrentUser } from "../../users/useCurrentUser";
import WithCurrentUser from "../../users/WithCurrentUser";

export default ({ currentUser }) => {
  return (
    <WithCurrentUser
      render={(currentUser) => {
        if (currentUser) {
          return;
        }
      }}
    />
  );
};
