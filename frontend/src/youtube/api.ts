import { BackendAPI } from "../backend-api";

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

export const videoKeyToEmbedURL = (videoKey: string | undefined) =>
  `https://www.youtube.com/embed/${videoKey}`;

export const videoKeyToThumbnailURL = (videoKey: string) =>
  `https://i.ytimg.com/vi/${videoKey}/maxresdefault.jpg`;

/* TODO: doesn't work for all cases */
export const youtbeCommentTextToMarkdown = (youtubeCommentText: string) =>
  youtubeCommentText
    /* "*bold*"     ->   "**bold**" */
    .replace(/\*/g, "**")
    /* "_italic_"   ->   "*italic*" */
    .replace(/_/g, "*");

export const details = ({ videoId }: { videoId: string }) => {
  if (!videoId) {
    return Promise.resolve({});
  }
  return BackendAPI.get("/api/youtube/videos", {
    params: {
      id: videoId,
      part: "snippet,statistics",
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return err.response.data;
    });
};

export const commentThreadList = ({ videoId }: { videoId: string }) => {
  if (!videoId) {
    return Promise.resolve({});
  }
  return BackendAPI.get("/api/youtube/commentThreads", {
    params: {
      videoId: videoId,
      part: "snippet",
      order: "relevance",
      textFormat: "plainText",
      maxResults: 50,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return err.response.data;
    });
};
