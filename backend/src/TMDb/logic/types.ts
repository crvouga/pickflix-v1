import {AxiosRequestConfig} from 'axios';

export type Request = ({
  path,
  query,
}: {
  path: string;
  query?: {[key: string]: any};
}) => Promise<any>;

export type Append = (_: {
  tmdbMediaId: string;
  tmdbMediaType: 'movie' | 'tv';
  [key: string]: any;
}) => Promise<{tmdbData: any; [key: string]: any}>;

export interface TMDbLogic {
  request: Request;
  append: Append;
}

export interface Cache {
  get: (k: any) => any;
  set: (k: any, v: any, timeToLive?: any) => any;
}

export type Http = (_: AxiosRequestConfig) => {data?: any};

export type BuildTMDbLogic = (_: {axios: any; keyv: any}) => TMDbLogic;
