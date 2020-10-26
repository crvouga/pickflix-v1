import {
  Box,
  makeStyles,
  Toolbar,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import AspectRatio from "../../common/components/AspectRatio";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import ErrorPage from "../../common/page/ErrorPage";
import LoadingPage from "../../common/page/LoadingPage";
import DiscoverMovieTag from "../../discover/DiscoverMovieTag";
import { TagType } from "../../discover/query/types";
import NavigationBar from "../../navigation/NavigationBar";
import { useMakeImageUrl } from "../../tmdb/makeTMDbImageURL";
import CurrentVideoPlayer from "../../video/CurrentVideoPlayer";
import PlaylistSection from "../../video/PlaylistSection";
import useCurrentVideo from "../../video/useCurrentVideo";
import MoviePosterCardScroll from "../components/MoviePosterCardScroll";
import { useQueryMovie } from "../data";
import { SMALL_DOT, toCertification, toReleaseYear, toRuntime } from "../utils";
import { uniqBy } from "ramda";

const useQueryMovieVideoPage = () => {
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  return useQueryMovie({ tmdbMediaId });
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.spacing(1),
    backgroundColor: "black",
  },
  svg: {
    borderRadius: theme.spacing(1),
    backgroundImage: ({ url }: { url?: string }) => `url('${url}')`,
    backgroundSize: "cover",
    opacity: 0.33,
  },
  content: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}));

const MovieCardSection = () => {
  const history = useHistory();
  const makeImageUrl = useMakeImageUrl();
  const { data } = useQueryMovieVideoPage();
  const classes = useStyles({
    url: makeImageUrl(
      3,
      data?.backdropPath
        ? { backdropPath: data?.backdropPath }
        : { posterPath: data?.posterPath }
    ),
  });

  if (!data) {
    return null;
  }

  const handleClick = () => {
    history.push(`/movie/${data.id}`);
  };

  return (
    <AspectRatio
      ratio={[16, 9]}
      ContainerProps={{
        onClick: handleClick,
        className: classes.container,
      }}
      SVGProps={{
        className: classes.svg,
      }}
      ContentProps={{
        className: classes.content,
      }}
    >
      <Typography variant="h6">{data.title}</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {[toReleaseYear(data), toCertification(data), toRuntime(data)]
          .filter((_) => _)
          .join(` ${SMALL_DOT} `)}
      </Typography>
      <Toolbar></Toolbar>
    </AspectRatio>
  );
};

export default () => {
  const { tmdbMediaId } = useParams<{ tmdbMediaId: string }>();
  const { data, error } = useQueryMovie({ tmdbMediaId });
  const currentVideo = useCurrentVideo();
  const makeImageUrl = useMakeImageUrl();

  useEffect(() => {
    let mounted = true;
    if (data?.videos && mounted) {
      currentVideo.setPlaylist(data.videos.results);
      currentVideo.setCurrentVideo(data.videos.results[0]);
    }
    return () => {
      mounted = false;
    };
  }, [data?.videos]);

  if (error) {
    return <ErrorPage />;
  }

  if (!data) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <NavigationBar title={data.title} />

      <CurrentVideoPlayer />

      <Paper>
        <PlaylistSection />
      </Paper>

      <Box p={2}>
        <MovieCardSection />
      </Box>
      <Box paddingLeft={2}>
        <Typography variant="h6" gutterBottom>
          Related Movies
        </Typography>
      </Box>
      <MoviePosterCardScroll
        ItemBoxProps={{ width: "150px" }}
        movies={uniqBy((_) => _.id, [
          ...data.similar.results,
          ...data.recommendations.results,
        ])}
      />

      <Box paddingLeft={2}>
        <Typography variant="h6" gutterBottom>
          Cast
        </Typography>
      </Box>
      <HorizontalScroll p={2} paddingTop={0}>
        {data.credits.cast.map((castCredit) => (
          <ListItem button key={castCredit.creditId} style={{ width: "auto" }}>
            <ListItemAvatar>
              <Avatar src={makeImageUrl(2, castCredit)} />
            </ListItemAvatar>
            <ListItemText
              primary={castCredit.name}
              secondary={castCredit.character}
            />
          </ListItem>
          // <Box marginRight={1} key={castCredit.creditId}>

          //   <DiscoverMovieTag
          //     variant="outlined"
          //     clickable
          //     tag={{
          //       type: TagType.withPeople,
          //       ...castCredit,
          //     }}
          //   />
          // </Box>
        ))}
      </HorizontalScroll>

      <Box paddingLeft={2}>
        <Typography variant="h6" gutterBottom>
          Crew
        </Typography>
      </Box>
      <HorizontalScroll p={2} paddingTop={0}>
        {data.credits.crew.map((crewCredit) => (
          <Box key={crewCredit.creditId} marginRight={1}>
            <DiscoverMovieTag
              variant="outlined"
              clickable
              tag={{
                type: TagType.withPeople,
                ...crewCredit,
              }}
            />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};
