import {
  Box,
  Card,
  CardProps,
  Grid,
  makeStyles,
  Typography,
  CardActionArea,
  Divider,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import MoviePosterCard from "../movie/components/MoviePosterCard";
import ChipUser from "./ChipUser";
import { ReviewAggergation } from "../reviews/query/types";
import MovieListItem from "../movie/components/MovieListItem";

type Props = { review: ReviewAggergation } & CardProps;

export default ({ review, ...props }: Props) => {
  return (
    <Card>
      <React.Fragment>
        <MovieListItem movie={review.tmdbData} />
        <Divider />
      </React.Fragment>
      <Box p={2} paddingTop={1}>
        <Typography variant="h6" noWrap>
          {review.review.title}
        </Typography>
        <Box display="flex" alignItems="center">
          <Box marginRight={1}>
            <Typography color="textSecondary" variant="subtitle2">
              {moment(review.review.createdAt).format("ll")}
            </Typography>
          </Box>
          <Box>
            <ChipUser user={review.author} size="small" noLink />
          </Box>
        </Box>
        <Rating value={review.review.rating} readOnly size="small" />
        <Typography variant="body1">{review.review.content}</Typography>
      </Box>
    </Card>
  );
};
