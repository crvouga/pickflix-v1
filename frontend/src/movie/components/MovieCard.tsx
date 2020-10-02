import { Card, CardActionArea } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import AspectRatio from "../../common/components/AspectRatio";
import { actions } from "../../redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";

export type MovieCardProps = {
  id: string;
  posterPath?: string;
  backdropPath?: string;
};

export default ({ posterPath, id, backdropPath }: MovieCardProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/movie/${id}` }));
  };

  return (
    <Card onClick={handleClick}>
      <CardActionArea>
        <AspectRatio ratio={[18, 24]}>
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
