import { TMDB_CONFIGURATION_KEY } from "./TmdbConfigurationGate";
import {
  ImagePaths,
  PathKey,
  pathKeyToSizesKey,
  SizesKey,
  TmdbConfiguration,
} from "./types";

const clamp = (min: number, max: number, n: number) =>
  Math.max(min, Math.min(max, n));

const clampIndexGet = <T>(array: Array<T>, index: number): T | undefined =>
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
    ([pathKey]) => pathKey in hasPathKey
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

export default (sizeIndex: number, hasPathKey: ImagePaths) => {
  const tmdbConfiguration = JSON.parse(
    localStorage.getItem(TMDB_CONFIGURATION_KEY) || "{}"
  );
  return makeImageUrl(tmdbConfiguration, sizeIndex, hasPathKey);
};
