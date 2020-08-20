import * as R from "ramda";

/** 
  INPUT:
  TMDbconfiguration =
    {
      ...
      images: {
        secureBaseUrl: "..."
        profileSizes: [...],
        posterSizes: [...],
        logoSizes: [...],
        ...
      }
    }

  sizeIndex = 
    some index of profileSizes OR posterSizes OR logoSizes OR ...

  objectWithImagePath = 
    { posterPath: "..." } OR { profilePath: "..." } OR { logoPath: "..." } OR ... 

  OUTPUT:
  url = 
    secureBaseUrl + (profileSize OR posterSize OR logoSize OR ...) + (profilePath OR posterSize OR logoSize OR ...)
*/

const allImageTypes = ["profile", "poster", "backdrop", "still", "logo"];

export default (TMDbconfiguration, sizeIndex, tmdbMedia) => {
  if (R.isNil(TMDbconfiguration) || R.isNil(sizeIndex) || R.isNil(tmdbMedia)) {
    return null;
  }

  const imageType = R.find((_) => R.has(`${_}Path`, tmdbMedia), allImageTypes);

  if (R.isNil(imageType)) {
    return null;
  }

  const path = tmdbMedia[`${imageType}Path`];

  if (R.isNil(path)) {
    return null;
  }

  const secureBaseUrl = TMDbconfiguration.images.secureBaseUrl;
  const sizes = TMDbconfiguration.images[`${imageType}Sizes`];
  const size = R.nth(R.clamp(0, sizes.length - 1, sizeIndex), sizes);
  const url = `${secureBaseUrl}${size}${path}`;

  return url;
};
