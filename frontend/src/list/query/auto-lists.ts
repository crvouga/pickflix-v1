import { BackendAPI } from "../../backend-api";
import { MediaId } from "../../media/tmdb/types";
import { AutoListAggergation } from "./types";

/*


*/

export type GetAutoListParams = {
  id?: string;
  ownerId?: string;
  includeListItemWithMediaId?: MediaId;
};

export const getAutoLists = async ({
  id,
  ownerId,
  includeListItemWithMediaId,
}: GetAutoListParams) => {
  const { data } = await BackendAPI.get<AutoListAggergation[]>(
    `/api/auto-lists`,
    {
      params: {
        id,
        ownerId,
        ...includeListItemWithMediaId,
      },
    }
  );
  return data;
};
