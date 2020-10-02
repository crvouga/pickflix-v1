import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import AspectRatio from "../../common/components/AspectRatio";
import { actions } from "../../redux";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { MovieCreditCast, MovieCreditCrew } from "../../tmdb/types";

type Props = { credit: MovieCreditCast | MovieCreditCrew };

export default ({ credit }: Props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.router.push({ pathname: `/person/${credit.id}` }));
  };

  return (
    <Card onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <AspectRatio ratio={[1, 1]} ContainerProps={{ marginBottom: 1 }}>
            <Avatar
              style={{ width: "100%", height: "100%" }}
              src={makeTMDbImageURL(4, credit)}
            />
          </AspectRatio>
          <Typography noWrap variant="body1" style={{ fontWeight: "bold" }}>
            {credit.name}
          </Typography>
          <Typography noWrap color="textSecondary" variant="body1">
            {"job" in credit && credit.job
              ? credit.job
              : "character" in credit && credit.character
              ? credit.character
              : "-"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
