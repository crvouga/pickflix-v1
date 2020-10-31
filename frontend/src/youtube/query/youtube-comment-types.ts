/**
 *
 * SOUCE:
 * https://developers.google.com/youtube/v3/docs/commentThreads/list
 * https://developers.google.com/youtube/v3/docs/commentThreads#resource
 * https://developers.google.com/youtube/v3/docs/comments#resource
 */

export type YoutubeComment = {
  kind: "youtube#comment";
  etag: string;
  id: string;
  snippet: {
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
      value: string;
    };
    channelId: string;
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    parentId: string;
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    moderationStatus: string;
    publishedAt: number;
    updatedAt: number;
  };
};

export type YoutubeCommentThread = {
  kind: "youtube#commentThread";
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    videoId: string;
    topLevelComment: YoutubeComment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
  replies: {
    comments: YoutubeComment[];
  };
};

export type YoutubeCommentThreadListResponse = {
  kind: "youtube#commentThreadListResponse";
  etag: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeCommentThread[];
};
