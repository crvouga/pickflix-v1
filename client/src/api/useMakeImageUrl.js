import * as R from "ramda";
import { useQuery } from "react-query";
import axios from "axios";

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

const makeImageUrl = R.curry(
  (configuration, sizeIndex, objectWithImagePath) => {
    if (
      R.isNil(configuration) ||
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

    const secureBaseUrl = configuration.images.secureBaseUrl;
    const sizes = configuration.images[`${imageType}Sizes`];
    const size = R.nth(R.clamp(0, sizes.length - 1, sizeIndex), sizes);
    const url = `${secureBaseUrl}${size}${path}`;

    return url;
  }
);

export default () => {
  const query = useQuery(
    "TMDBconfiguration",
    () => axios.get("/api/tmdb/configuration").then((res) => res.data),
    {
      staleTime: Infinity,
    }
  );

  const configuration = query.data;

  return query.status === "success" ? makeImageUrl(configuration) : () => "";
};
