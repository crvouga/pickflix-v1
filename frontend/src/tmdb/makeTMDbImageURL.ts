import { AxiosResponse } from "axios";
import backendAPI from "../backendAPI";
import {
  imagePathToImageSize,
  TmdbConfiguration,
  TmdbImagePath,
  TmdbMedia,
} from "./types";

const clamp = (min: number, max: number, n: number) =>
  Math.max(min, Math.min(max, n));

const clampIndexGet = (array: Array<any>, index: number): any =>
  array[clamp(0, array.length - 1, index)];

const makeImageUrl = (tmdbConfiguration: TmdbConfiguration | undefined) => (
  sizeIndex: number,
  tmdbMedia: { [key: string]: any }
): string => {
  if (!tmdbConfiguration || !tmdbMedia) {
    return "";
  }

  const imagePathKey = Object.keys(TmdbImagePath).find(
    (imagePathKey) => imagePathKey in tmdbMedia
  ) as TmdbImagePath | undefined;

  if (!imagePathKey) {
    return "";
  }

  const sizesKey = imagePathToImageSize[imagePathKey];

  const sizes = tmdbConfiguration.images[sizesKey];

  const path = tmdbMedia[imagePathKey];

  if (!path) {
    return "";
  }

  const size = clampIndexGet(sizes, sizeIndex);

  const secureBaseUrl = tmdbConfiguration.images.secureBaseUrl;

  const imageUrl = `${secureBaseUrl}${size}${path}`;

  return imageUrl;
};

let tmdbConfiguration: TmdbConfiguration | undefined = undefined;

backendAPI
  .get("/api/tmdb/configuration")
  .then((res: AxiosResponse<TmdbConfiguration>) => {
    tmdbConfiguration = res.data;
  });

export default makeImageUrl(tmdbConfiguration);
