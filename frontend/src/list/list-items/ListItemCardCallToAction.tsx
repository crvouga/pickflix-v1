import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import React from "react";
import useModal from "../../app/modals/useModal";
type Props = {
  title?: string;
  subtitle?: string;
  onClick?: () => void;
};

export default ({
  onClick,
  title = "Add a movie",
  subtitle = "There is no movies in this list",
}: Props) => {
  const { open } = useModal("AddListItemForm");
  const handleClick = () => {
    open();
  };
  return (
    <Card>
      <CardActionArea onClick={onClick || handleClick}>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <MovieCreationOutlinedIcon
              style={{ width: "64px", height: "64px" }}
            />
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
