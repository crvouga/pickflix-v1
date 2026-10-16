import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

export type NodeEnv = "test" | "development" | "production";

export const castNodeEnv = (env: any = "development"): NodeEnv => {
  if (env === "development" || env === "test" || env === "production") {
    return env;
  }
  throw new Error("failed to cast node env");
};

export const getNodeEnv = () =>
  castNodeEnv(process.env.NODE_ENV || "development");

export type RepositoryImplementation = "postgres" | "hashMap" | "fileSystem";

export const castRepositoryImplementation = (
  repositoryImplementation: any
): RepositoryImplementation => {
  if (
    repositoryImplementation === "postgres" ||
    repositoryImplementation === "hashMap" ||
    repositoryImplementation === "fileSystem"
  ) {
    return repositoryImplementation;
  }
  throw new Error("failed to cast repository implementation");
};

export const getRepositoryImplementation = () =>
  castRepositoryImplementation(
    process.env.REPOSITORY_IMPLEMENTATION ?? "fileSystem"
  );

export type Secrets = Readonly<{
  // used for database
  // used by Heroku postgres addon
  // SOURCE: https://dashboard.heroku.com/apps/crvouga-pickflix
  posgresConnectionString: string;

  // for movie data
  // SOURCE: https://www.themoviedb.org/settings/api.
  TMDB_API_READ_ACCESS_TOKEN: string;

  // for youtube data
  // SOURCE: https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=pickflix.
  youtubeApiKey: string;

  // for sending emails
  // SOURCE: https://resend.com/api-keys
  resendApiKey: string;
  emailFrom: string;

  // secret for making secrets
  secret: string;

  //
  sessionCookieSecret: string;
}>;

const {
  YOUTUBE_API_KEY,
  TMDB_API_READ_ACCESS_TOKEN,
  DATABASE_URL,
  RESEND_API_KEY,
  EMAIL_FROM,
  PICKFLIX_SECRET: SECRET,
  PICKFLIX_SESSION_SECRET: SESSION_COOKIE_SECRET,
} = process.env;

if (!YOUTUBE_API_KEY) {
  throw "YOUTUBE_API_KEY required";
}

if (!TMDB_API_READ_ACCESS_TOKEN) {
  throw "TMDB_API_READ_ACCESS_TOKEN required";
}

if (!DATABASE_URL) {
  throw "DATABASE_URL required";
}

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY required");
}

if (!EMAIL_FROM) {
  throw "EMAIL_FROM required";
}

if (!SECRET) {
  throw "PICKFLIX_SECRET required";
}

if (!SESSION_COOKIE_SECRET) {
  throw new Error("PICKFLIX_SESSION_SECRET required");
}

export const secrets: Secrets = {
  posgresConnectionString: DATABASE_URL,

  TMDB_API_READ_ACCESS_TOKEN: TMDB_API_READ_ACCESS_TOKEN,
  youtubeApiKey: YOUTUBE_API_KEY,
  resendApiKey: RESEND_API_KEY,
  emailFrom: EMAIL_FROM,
  secret: SECRET,
  sessionCookieSecret: SESSION_COOKIE_SECRET,
};
