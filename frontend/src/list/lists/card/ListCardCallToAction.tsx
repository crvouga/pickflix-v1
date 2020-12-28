import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import React from "react";
import useModal from "../../../app/modals/useModal";

type Props = {
  title?: string;
  subtitle?: string;
  onClick?: () => void;
};

export default ({
  onClick,
  title = "Make a list",
  subtitle = "Keep track of movie you like or want to watch",
}: Props) => {
  const { open } = useModal("CreateListForm");
  const handleClick = () => {
    open();
  };
  return (
    <Card>
      <CardActionArea onClick={onClick || handleClick}>
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
          <Box p={2} width="100%" display="flex" justifyContent="center">
            <Button size="large" variant="outlined">
              Make List
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
