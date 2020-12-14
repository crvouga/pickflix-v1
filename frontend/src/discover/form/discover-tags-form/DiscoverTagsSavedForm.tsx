import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useQueryCache } from "react-query";
import useModal from "../../../app/modals/useModal";
import { BackendAPI } from "../../../backend-api";
import ErrorBox from "../../../common/components/ErrorBox";
import LoadingBox from "../../../common/components/LoadingBox";
import NothingHere from "../../../common/components/NothingHere";
import {
  InfiniteScrollBottom,
  useInfiniteQueryPagination,
} from "../../../common/infinite-scroll";
import { Paginated } from "../../../common/types";
import { DiscoverMovieTagGroup } from "../../DiscoverMovieTag";
import { IDiscoverTag } from "../../query/types";
import useDiscoverState from "../../redux/useDiscoverState";
import { isEqualKeys } from "../../../common/utility";

type TmdbDiscoverTags = {
  id: string;
  userId: string;
  serializedTagsById: string;
  createdAt: number;
};

type GetTmdbDiscoverTagsData = Paginated<TmdbDiscoverTags>[];

const getDiscoverTags = async (params: { page?: number }) => {
  const { data } = await BackendAPI.get<Paginated<TmdbDiscoverTags>>(
    "/api/media/tmdb/discover/tags",
    {
      params,
    }
  );
  return data;
};
const makeGetDiscoverTagsQueryKey = () => ["discover-tags"];

const useQueryDiscoverTags = () => {
  return useInfiniteQueryPagination(
    makeGetDiscoverTagsQueryKey(),
    ({ lastPage }) => getDiscoverTags({ page: lastPage }),
    {}
  );
};

const deleteTmdbDiscoverTags = async ({
  tmdbDiscoverTagsId,
}: {
  tmdbDiscoverTagsId: string;
}) => {
  await BackendAPI.delete(
    `/api/media/tmdb/discover/tags/${tmdbDiscoverTagsId}`
  );
};

const optimisticUpdateRemoveDiscoverTags = (
  data: GetTmdbDiscoverTagsData,
  id: string
) => {
  return data.map((page) => ({
    ...page,
    results: page.results.filter((result) => result.id !== id),
  }));
};

const useMutationRemoveDiscoverTags = () => {
  const queryCache = useQueryCache();
  return async ({ tmdbDiscoverTagsId }: { tmdbDiscoverTagsId: string }) => {
    try {
      const queryKey = makeGetDiscoverTagsQueryKey();
      const data = queryCache.getQueryData<GetTmdbDiscoverTagsData>(queryKey);
      if (data) {
        queryCache.setQueryData(
          queryKey,
          optimisticUpdateRemoveDiscoverTags(data, tmdbDiscoverTagsId)
        );
      }
      await deleteTmdbDiscoverTags({ tmdbDiscoverTagsId });
    } catch (error) {
    } finally {
    }
  };
};

const DiscoverTagsFormListItem = ({
  tmdbDiscoverTags,
}: {
  tmdbDiscoverTags: TmdbDiscoverTags;
}) => {
  const removeDiscoverTagsMutation = useMutationRemoveDiscoverTags();
  const { close } = useModal("DiscoverTagsForm");
  const { activeTagState, setActiveTagsById } = useDiscoverState();
  const tagsById = JSON.parse(tmdbDiscoverTags.serializedTagsById);

  return (
    <ListItem
      selected={isEqualKeys(tagsById, activeTagState.present.activeTagsById)}
      key={tmdbDiscoverTags.id}
      button
      onClick={() => {
        close();
        setActiveTagsById(tagsById);
      }}
    >
      <DiscoverMovieTagGroup
        tagsById={tagsById}
        ChipProps={{ variant: "outlined" }}
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            removeDiscoverTagsMutation({
              tmdbDiscoverTagsId: tmdbDiscoverTags.id,
            });
          }}
        >
          <Box color="text.secondary">
            <DeleteIcon style={{ color: "inherit" }} />
          </Box>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export const DiscoverTagsSavedForm = () => {
  const query = useQueryDiscoverTags();

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox marginTop={12} />;
  }

  const tmdbDiscoverTagsGroups = query.data.flatMap((page) => page.results);

  return (
    <List>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary="Saved"
        />
      </ListItem>
      {tmdbDiscoverTagsGroups.length === 0 && <NothingHere />}
      {tmdbDiscoverTagsGroups.map((tmdbDiscoverTags) => (
        <DiscoverTagsFormListItem
          key={tmdbDiscoverTags.id}
          tmdbDiscoverTags={tmdbDiscoverTags}
        />
      ))}
      <InfiniteScrollBottom
        canFetchMore={query.canFetchMore}
        fetchMoreRef={query.fetchMoreRef}
      />
    </List>
  );
};
