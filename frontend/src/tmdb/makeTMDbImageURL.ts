import { AxiosResponse } from "axios";
import backendAPI from "../backendAPI";
import {
  PathKey,
  SizesKey,
  pathKeyToSizesKey,
  TmdbConfiguration,
  ImagePaths,
} from "./types";

const clamp = (min: number, max: number, n: number) =>
  Math.max(min, Math.min(max, n));

const clampIndexGet = <T>(array: Array<T>, index: number): T =>
  array[clamp(0, array.length - 1, index)];

const makeImageUrl = (
  tmdbConfiguration: TmdbConfiguration | undefined,
  sizeIndex: number,
  hasPathKey: ImagePaths
): string => {
  if (!tmdbConfiguration || !hasPathKey) {
    return "";
  }

  const found = Object.entries(pathKeyToSizesKey).find(
    ([pathKey, sizesKey]) => pathKey in hasPathKey
  );

  if (!found) {
    return "";
  }

  const [pathKey, sizesKey] = found as [PathKey, SizesKey];

  const path = hasPathKey[pathKey];

  if (!path) {
    return "";
  }

  const sizes = tmdbConfiguration.images[sizesKey];

  const size = clampIndexGet(sizes, sizeIndex);

  const secureBaseUrl = tmdbConfiguration.images.secureBaseUrl;

  const imageUrl = `${secureBaseUrl}${size}${path}`;

  return imageUrl;
};

let tmdbConfiguration: TmdbConfiguration | undefined = undefined;

backendAPI
  .get("/api/tmdb/configuration")
  .then((res: AxiosResponse<TmdbConfiguration>) => {
    console.log({ tmdbConfiguration });
    tmdbConfiguration = res.data;
    console.log({ tmdbConfiguration });
  });

export default (sizeIndex: number, hasPathKey: ImagePaths) =>
  makeImageUrl(tmdbConfiguration, sizeIndex, hasPathKey);
