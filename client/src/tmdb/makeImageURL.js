import * as R from "ramda";
/* 

  INPUT: 
  
  TMDBconfiguration = 
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

export default (TMDBconfiguration, sizeIndex, objectWithImagePath) => {
  if (
    R.isNil(TMDBconfiguration) ||
    R.isNil(sizeIndex) ||
    R.isNil(objectWithImagePath)
  ) {
    return null;
  }

  const imageType = R.find(
    (imageType) => R.has(`${imageType}Path`, objectWithImagePath),
    allImageTypes
  );

  if (R.isNil(imageType)) {
    return null;
  }

  const path = objectWithImagePath[`${imageType}Path`];

  if (R.isNil(path)) {
    return null;
  }

  const secureBaseUrl = TMDBconfiguration.images.secureBaseUrl;
  const sizes = TMDBconfiguration.images[`${imageType}Sizes`];
  const size = R.nth(R.clamp(0, sizes.length - 1, sizeIndex), sizes);
  const url = `${secureBaseUrl}${size}${path}`;

  return url;
};
