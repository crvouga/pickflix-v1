import {
  Box,
  Card,
  CardContent,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import { uniqBy } from "ramda";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useHistory } from "react-router";
import ErrorBox from "../common/components/ErrorBox";
import ListItemSkeleton from "../common/components/ListItemSkeleton";
import { InfiniteScrollBottom } from "../common/infinite-scroll";
import { ListItemAggergation, useQueryListItems } from "../list/query";
import { getMoviesRecommendations } from "../media/tmdb/query";
import MovieAvatar from "../movie/components/MovieAvatar";
import {
  MoviePosterScrollInfinite,
  MoviePosterScrollSkeleton,
} from "../movie/components/MoviePosterScroll";
import SignInCallToAction from "../user/auth/SignInCallToAction";
import WithAuthentication from "../user/auth/WithAuthentication";
import { UserAggergation } from "../user/query";

const CurrentUserFeedTitle = () => {
  return (
    <ListItem>
      <ListItemIcon>
        <MovieCreationOutlinedIcon />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ variant: "h6" }}
        primary="From your lists"
      />
    </ListItem>
  );
};

const FeedItemSkeleton = () => {
  return (
    <React.Fragment>
      <ListItemSkeleton avatarShape="rect" />
      <MoviePosterScrollSkeleton posterCount={5} />
    </React.Fragment>
  );
};

const CurrentUserFeedSkeleton = () => {
  return (
    <React.Fragment>
      <CurrentUserFeedTitle />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
      <FeedItemSkeleton />
    </React.Fragment>
  );
};

const NoListItemsCallToAction = () => {
  return (
    <Card>
      <CardContent>
        <Typography align="center" variant="h5">
          You haven't added any movies to a list!
        </Typography>
        <Typography align="center" variant="subtitle1" color="textSecondary">
          Add some movies to a list and come back to see your feed.
        </Typography>
      </CardContent>
    </Card>
  );
};

const FeedItem = ({ listItem }: { listItem: ListItemAggergation }) => {
  const history = useHistory();
  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() => {
          history.push(`/movie/${listItem.listItem.mediaId.tmdbMediaId}`);
        }}
      >
        <ListItemAvatar>
          <MovieAvatar movie={listItem.tmdbData} />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{ variant: "h6" }}
          primary={listItem.tmdbData.title}
          secondary={`Similar Movies`}
        />
      </ListItem>

      <MoviePosterScrollInfinite
        queryKey={[listItem.listItem.id, "related"]}
        queryFn={({ page }) =>
          getMoviesRecommendations({
            mediaId: listItem.listItem.mediaId,
            page,
          })
        }
      />
    </React.Fragment>
  );
};

const CurrentUserFeed = ({ currentUser }: { currentUser: UserAggergation }) => {
  const query = useQueryListItems({
    userId: currentUser.user.id,
  });

  const listItems = query?.data?.flatMap((page) => page.results) || [];

  const PAGE_SIZE = 1;
  const [page, setPage] = useState(2);
  const [inViewRef, isInView] = useInView();
  useEffect(() => {
    if (isInView) {
      setPage((page) => page + 1);
    }
  }, [isInView]);

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <CurrentUserFeedSkeleton />;
  }

  const uniqueListItems = uniqBy(
    (listItem) => listItem.listItem.mediaId.tmdbMediaId,
    listItems
  );

  const visibleUniqueListItems = uniqueListItems.slice(0, PAGE_SIZE * page);

  if (visibleUniqueListItems.length === 0) {
    return (
      <React.Fragment>
        <CurrentUserFeedTitle />
        <Container maxWidth="xs">
          <NoListItemsCallToAction />
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CurrentUserFeedTitle />

      {visibleUniqueListItems.map((listItem) => (
        <Box key={listItem.listItem.id}>
          <FeedItem listItem={listItem} />
        </Box>
      ))}

      {visibleUniqueListItems.length < uniqueListItems.length && (
        <InfiniteScrollBottom fetchMoreRef={inViewRef} canFetchMore={true} />
      )}

      {visibleUniqueListItems.length === uniqueListItems.length &&
        (query.canFetchMore ? (
          <InfiniteScrollBottom
            fetchMoreRef={query.fetchMoreRef}
            canFetchMore={query.canFetchMore}
          />
        ) : (
          <Container maxWidth="xs">
            <Box p={4}>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                align="center"
              >
                End of feed. Add some more movies to your lists to make your
                feed longer.
              </Typography>
            </Box>
          </Container>
        ))}
    </React.Fragment>
  );
};

export const TabPanelCurrentUser = () => {
  return (
    <WithAuthentication
      renderUnathenticated={() => <SignInCallToAction />}
      renderAuthenticated={(currentUser) => (
        <CurrentUserFeed currentUser={currentUser} />
      )}
      renderLoading={() => <CurrentUserFeedSkeleton />}
    />
  );
};
