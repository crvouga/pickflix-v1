import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import { Rating } from "@material-ui/lab";
import React from "react";

export type ReviewCardCallToActionProps = {
  onClick?: () => void;
  title?: string;
  subtitle?: string;
};

export const ReviewCardCallToAction = ({
  onClick,
  title = "Write a review",
  subtitle = "Help people decide if they should watch any given movie",
}: ReviewCardCallToActionProps) => {
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
              <RateReviewOutlinedIcon
                style={{ width: "64px", height: "64px" }}
              />
            </Box>

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
            <Box p={2}>
              <Button variant="outlined" size="large">
                Write Review
              </Button>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
