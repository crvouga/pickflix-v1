import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import AvatarUser from "../../users/AvatarUser";
import { UserAggergation } from "../../users/query";
import { pluralize } from "../../utils";

type Props = {
  user: UserAggergation;
  onClick?: () => void;
  title?: string;
  subtitle?: string;
};

export default ({ user, onClick, title, subtitle }: Props) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box paddingBottom={1}>
              <AvatarUser
                style={{ width: "48px", height: "48px", fontSize: "2em" }}
                user={user.user}
              />
            </Box>
            <Typography align="center" color="textSecondary">
              {`${user.user.username} · ${pluralize(
                user.reviewCount,
                "review"
              )}`}
            </Typography>
            <Typography variant="h6" align="center">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              {subtitle}
            </Typography>
            <Rating disabled name="rating" size="large" max={5} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
