/**
 * SOUCRE:
 * https://developers.google.com/youtube/v3/docs/videos#resource
 * https://developers.google.com/youtube/v3/docs/videos/list
 *
 */

export type YoutubeVideoSnippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    [key: string]: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
};

export type YoutubeVideoContentDetails = {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  regionRestriction: {
    allowed: string[];
    blocked: string[];
  };
  contentRating: {
    acbRating: string;
    agcomRating: string;
    anatelRating: string;
    bbfcRating: string;
    bfvcRating: string;
    bmukkRating: string;
    catvRating: string;
    catvfrRating: string;
    cbfcRating: string;
    cccRating: string;
    cceRating: string;
    chfilmRating: string;
    chvrsRating: string;
    cicfRating: string;
    cnaRating: string;
    cncRating: string;
    csaRating: string;
    cscfRating: string;
    czfilmRating: string;
    djctqRating: string;
    djctqRatingReasons: string[];
    ecbmctRating: string;
    eefilmRating: string;
    egfilmRating: string;
    eirinRating: string;
    fcbmRating: string;
    fcoRating: string;
    fmocRating: string;
    fpbRating: string;
    fpbRatingReasons: string[];
    fskRating: string;
    grfilmRating: string;
    icaaRating: string;
    ifcoRating: string;
    ilfilmRating: string;
    incaaRating: string;
    kfcbRating: string;
    kijkwijzerRating: string;
    kmrbRating: string;
    lsfRating: string;
    mccaaRating: string;
    mccypRating: string;
    mcstRating: string;
    mdaRating: string;
    medietilsynetRating: string;
    mekuRating: string;
    mibacRating: string;
    mocRating: string;
    moctwRating: string;
    mpaaRating: string;
    mpaatRating: string;
    mtrcbRating: string;
    nbcRating: string;
    nbcplRating: string;
    nfrcRating: string;
    nfvcbRating: string;
    nkclvRating: string;
    oflcRating: string;
    pefilmRating: string;
    rcnofRating: string;
    resorteviolenciaRating: string;
    rtcRating: string;
    rteRating: string;
    russiaRating: string;
    skfilmRating: string;
    smaisRating: string;
    smsaRating: string;
    tvpgRating: string;
    ytRating: string;
  };
  projection: string;
  hasCustomThumbnail: boolean;
};

export type YoutubeVideoStatus = {
  uploadStatus: string;
  failureReason: string;
  rejectionReason: string;
  privacyStatus: string;
  publishAt: string;
  license: string;
  embeddable: boolean;
  publicStatsViewable: boolean;
  madeForKids: boolean;
  selfDeclaredMadeForKids: boolean;
};

export type YoutubeVideoStatistics = {
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  favoriteCount: number;
  commentCount: number;
};

export type YoutubeVideo = {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: YoutubeVideoSnippet;
  contentDetails: YoutubeVideoContentDetails;
  status: YoutubeVideoStatus;
  statistics: YoutubeVideoStatistics;
  player: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
  topicDetails: {
    topicIds: string[];
    relevantTopicIds: string[];
    topicCategories: string[];
  };
  recordingDetails: {
    recordingDate: string;
  };
  fileDetails: {
    fileName: string;
    fileSize: number;
    fileType: string;
    container: string;
    videoStreams: [
      {
        widthPixels: number;
        heightPixels: number;
        frameRateFps: number;
        aspectRatio: number;
        codec: string;
        bitrateBps: number;
        rotation: string;
        vendor: string;
      }
    ];
    audioStreams: [
      {
        channelCount: number;
        codec: string;
        bitrateBps: number;
        vendor: string;
      }
    ];
    durationMs: number;
    bitrateBps: number;
    creationTime: string;
  };
  processingDetails: {
    processingStatus: string;
    processingProgress: {
      partsTotal: number;
      partsProcessed: number;
      timeLeftMs: number;
    };
    processingFailureReason: string;
    fileDetailsAvailability: string;
    processingIssuesAvailability: string;
    tagSuggestionsAvailability: string;
    editorSuggestionsAvailability: string;
    thumbnailsAvailability: string;
  };
  suggestions: {
    processingErrors: [string];
    processingWarnings: [string];
    processingHints: [string];
    tagSuggestions: [
      {
        tag: string;
        categoryRestricts: [string];
      }
    ];
    editorSuggestions: [string];
  };
  liveStreamingDetails: {
    actualStartTime: number;
    actualEndTime: number;
    scheduledStartTime: number;
    scheduledEndTime: number;
    concurrentViewers: number;
    activeLiveChatId: string;
  };
  localizations: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
};

export type YoutubeVideoListResponse = {
  kind: "youtube#videoListResponse";
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeVideo[];
};
