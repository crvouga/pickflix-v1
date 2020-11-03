import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import AspectRatio from "../../common/components/AspectRatio";
import makeImageUrl from "../../tmdb/makeImageUrl";
import { MovieCreditCast, MovieCreditCrew } from "../../tmdb/types";

type Props = { credit: MovieCreditCast | MovieCreditCrew };

export default ({ credit }: Props) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/person/${credit.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <AspectRatio ratio={[1, 1]} ContainerProps={{ marginBottom: 1 }}>
            <Avatar
              style={{ width: "100%", height: "100%" }}
              src={makeImageUrl(4, credit)}
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
