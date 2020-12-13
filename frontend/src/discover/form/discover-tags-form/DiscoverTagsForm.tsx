import {
  Hidden,
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import React from "react";
import useModal from "../../../app/modals/useModal";
import { BackendAPI } from "../../../backend-api";
import ErrorBox from "../../../common/components/ErrorBox";
import LoadingBox from "../../../common/components/LoadingBox";
import {
  ResponsiveDialog,
  DoneButton,
} from "../../../common/components/ResponsiveDialog";
import {
  useInfiniteQueryPagination,
  InfiniteScrollBottom,
} from "../../../common/infinite-scroll";
import { Paginated } from "../../../common/types";
import DiscoverMovieTag from "../../DiscoverMovieTag";
import { IDiscoverMovieTag } from "../../query/types";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import useDiscoverState from "../../useDiscoverState";

type TmdbDiscoverTags = {
  id: string;
  userId: string;
  serializedTagsById: string;
  createdAt: number;
};

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

const serializedTagsByIdToTags = (
  serializedTagsById: string
): IDiscoverMovieTag[] => {
  const tagsById: { [id: string]: IDiscoverMovieTag } = JSON.parse(
    serializedTagsById
  );

  const tags = Object.values(tagsById);

  return tags;
};

const DiscoverTagsFormListItem = ({
  tmdbDiscoverTags,
}: {
  tmdbDiscoverTags: TmdbDiscoverTags;
}) => {
  const { close } = useModal("DiscoverTagsForm");
  const { setActiveTags } = useDiscoverState();
  const tags = serializedTagsByIdToTags(tmdbDiscoverTags.serializedTagsById);

  return (
    <ListItem
      key={tmdbDiscoverTags.id}
      button
      divider
      onClick={() => {
        close();
        setActiveTags(tags);
      }}
    >
      <Box display="flex" flexWrap="wrap">
        {tags.map((tag) => (
          <Box key={tag.id} m={1 / 2}>
            <DiscoverMovieTag clickable={false} tag={tag} />
          </Box>
        ))}
      </Box>
      <ListItemSecondaryAction>
        <IconButton>
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export const DiscoverTagsForm = () => {
  const { fetchMoreRef, ...query } = useQueryDiscoverTags();

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox />;
  }

  const tmdbDiscoverTagsGroups = query.data.flatMap((page) => page.results);

  return (
    <List>
      {tmdbDiscoverTagsGroups.map((tmdbDiscoverTags) => (
        <DiscoverTagsFormListItem
          key={tmdbDiscoverTags.id}
          tmdbDiscoverTags={tmdbDiscoverTags}
        />
      ))}
      <InfiniteScrollBottom fetchMoreRef={fetchMoreRef} />
    </List>
  );
};

export const DiscoverTagsFormModal = () => {
  const { isOpen, close } = useModal("DiscoverTagsForm");

  return (
    <ResponsiveDialog open={isOpen} onClose={close}>
      <DiscoverTagsForm />
      <Hidden smUp>
        <Box position="fixed" bottom={0} left={0} top="auto" width="100%">
          <DoneButton onClick={close} />
        </Box>
      </Hidden>
    </ResponsiveDialog>
  );
};
