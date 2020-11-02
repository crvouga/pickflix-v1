import { BackendAPI } from "../../backend-api";
import { YoutubeVideoListResponse } from "./types";

import axios from "axios";
import { YoutubeCommentThreadListResponse } from "./youtube-comment-types";
import { useQuery } from "react-query";

export * from "./types";

export const embedConfig = {
  embedOptions: {
    enablejsapi: 1,
    enablecastapi: 1,
  },
  playerVars: {
    enablecastapi: 1,
    rel: 0,
    showinfo: 0,
    autoplay: 0,
    enablejsapi: 1,
    modestbranding: 1,
  },
};

export const videoKeyToYoutubeVideoURL = (videoKey: string | undefined) =>
  `https://www.youtube.com/watch?v=${videoKey}`;

export const videoKeyToEmbedURL = (videoKey: string | undefined) =>
  `https://www.youtube.com/embed/${videoKey}`;

export const videoKeyToThumbnailURL = (videoKey: string) =>
  `https://i.ytimg.com/vi/${videoKey}/maxresdefault.jpg`;

/* TODO: doesn't work for all cases */
export const youtubeCommentTextToMarkdown = (youtubeCommentText: string) =>
  youtubeCommentText
    /* "*bold*"     ->   "**bold**" */
    .replace(/\*/g, "**")
    /* "_italic_"   ->   "*italic*" */
    .replace(/_/g, "*");

export const queryKeys = {
  youtubeEmbedded: ({ videoId }: { videoId: string }) => [
    "youtube",
    "embedded",
    videoId,
  ],
  youtubeVideoDetails: ({ videoId }: { videoId?: string }) => [
    "youtube",
    "details",
    videoId,
  ],
  youtubeCommentThread: ({ videoId }: { videoId?: string }) => [
    "yotube",
    "commentThread",
    videoId,
  ],
};

export const getYoutubeEmbedded = async ({
  videoKey,
}: {
  videoKey: string;
}) => {
  const { data } = await axios.get(videoKeyToEmbedURL(videoKey), {
    withCredentials: true,
    params: {
      origin: window.location.origin,
    },
  });
  return data;
};

export const getYoutubeVideoDetails = async ({
  videoId,
}: {
  videoId: string;
}) => {
  const { data } = await BackendAPI.get<YoutubeVideoListResponse>(
    "/api/youtube/videos",
    {
      params: {
        id: videoId,
        part: "snippet,statistics",
      },
    }
  );
  return data;
};

export const useQueryYoutubeVideoDetails = ({
  videoId,
}: {
  videoId?: string;
}) => {
  return useQuery(queryKeys.youtubeVideoDetails({ videoId }), () =>
    videoId ? getYoutubeVideoDetails({ videoId }) : Promise.reject()
  );
};

export const getYoutubeVideoCommentThreadList = async ({
  videoId,
}: {
  videoId: string;
}) => {
  const { data } = await BackendAPI.get<YoutubeCommentThreadListResponse>(
    "/api/youtube/commentThreads",
    {
      params: {
        videoId: videoId,
        part: "snippet",
        order: "relevance",
        textFormat: "plainText",
        maxResults: 50,
      },
    }
  );
  return data;
};
