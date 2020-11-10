import { User } from "./query";
import { useQueryCurrentUser } from "./useCurrentUser";

type Props = {
  render: (currentUser?: User | null) => any;
};
export default ({ render }: Props) => {
  const query = useQueryCurrentUser();

  switch (query.status) {
    case "success":
      const currentUser = query.data || null;
      return render(currentUser);
    default:
      return null;
  }
};
