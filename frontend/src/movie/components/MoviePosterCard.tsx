import { Card, CardActionArea } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import AspectRatio from "../../common/components/AspectRatio";
import { actions } from "../../redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";

export type MoviePosterCardProps = {
  id: string;
  posterPath?: string | null;
  backdropPath?: string | null;
};

export const POSTER_ASPECT_RATIO: [number, number] = [18, 24];

export default ({ posterPath, id, backdropPath }: MoviePosterCardProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/movie/${id}` }));
  };

  return (
    <Card onClick={handleClick}>
      <CardActionArea>
        <AspectRatio ratio={POSTER_ASPECT_RATIO}>
          <img
            src={makeTMDbImageURL(3, { posterPath })}
            width="100%"
            height="100%"
          />
        </AspectRatio>
      </CardActionArea>
    </Card>
  );
};
