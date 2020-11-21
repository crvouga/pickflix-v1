import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Typography,
  CardContent,
} from "@material-ui/core";
import React from "react";
import { MovieIconBox } from "./ListCardImage";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

type Props = {
  title: string;
  subtitle: string;
  onClick: () => void;
};

export default ({ onClick, title, subtitle }: Props) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <PlaylistAddIcon style={{ width: "64px", height: "64px" }} />
          </Box>
          <Typography variant="h6" align="center">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
