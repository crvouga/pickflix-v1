import { TmdbMediaType } from "../../tmdb/types";
import { addReviewMutation } from "../query";
import { useQueryCache } from "react-query";
import useSnackbar from "../../snackbar/useSnackbar";

type Props = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export default ({ tmdbMediaId, tmdbMediaType }: Props) => {
  const queryCache = useQueryCache();
  const snackbar = useSnackbar();
  const submit = async ({ content }: { content: string }) => {
    try {
      await addReviewMutation(queryCache)({
        content,
        tmdbMediaId,
        tmdbMediaType,
      });

      snackbar.display({
        message: "Review posted",
      });
    } catch (error) {
      throw error;
    } finally {
    }
  };

  return {
    submit,
  };
};
