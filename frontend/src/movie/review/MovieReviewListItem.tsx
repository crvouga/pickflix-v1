import {
  Box,
  Card,
  CardProps,
  Divider,
  Typography,
  CardHeader,
  CardActionArea,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import MovieListItem from "../components/MovieListItem";
import { ReviewAggergation } from "../../reviews/query/types";
import ChipUser from "../../users/ChipUser";
import AvatarUser from "../../users/AvatarUser";
import { useHistory } from "react-router";

type Props = { review: ReviewAggergation } & CardProps;

const toPublishedAt = (date: any) =>
  moment(date, "YYYYMMDD").fromNow().replace("a ", "1 ");

export default ({ review, ...props }: Props) => {
  const history = useHistory();
  return (
    <Card>
      <CardActionArea
        onClick={() => {
          history.push(`/user/${review.author.username}`);
        }}
      >
        <CardHeader
          avatar={<AvatarUser user={review.author} />}
          title={review.author.username}
          subheader={toPublishedAt(new Date(review.review.createdAt))}
        />
      </CardActionArea>
      <Box p={2} paddingTop={0}>
        <Typography variant="h5">{review.review.title}</Typography>

        <Rating value={review.review.rating} readOnly size="medium" />
        <Typography variant="body1">{review.review.content}</Typography>
      </Box>
    </Card>
  );
};
