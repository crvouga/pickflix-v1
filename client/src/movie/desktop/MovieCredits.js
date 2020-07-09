import {
  Avatar,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import * as R from "ramda";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
}));

export default () => {
  const { id } = useParams();

  const creditsQuery = useQuery(
    ["movie", id, "credits"],
    () => axios.get(`/api/tmdb/movie/${id}/credits`).then((res) => res.data),
    {}
  );

  const classes = useStyles();
  const history = useHistory();
  const [selectedDepartment, setSelectedDepartment] = useState("Acting");

  if (creditsQuery.status !== "success") {
    return <CircularProgress color="secondary" />;
  }

  const credits = creditsQuery.data;
  const { cast, crew } = credits;
  const creditsByDepartment = R.assoc(
    "Acting",
    cast,
    R.groupBy(R.prop("department"), crew)
  );
  const departments = R.keys(creditsByDepartment);

  return (
    <div>
      <div className={classes.chipContainer}>
        {departments.map((department) => (
          <Chip
            key={department}
            label={department}
            variant={department === selectedDepartment ? "default" : "outlined"}
            clickable
            onClick={() => setSelectedDepartment(department)}
          />
        ))}
      </div>
      <List>
        {R.prop(selectedDepartment, creditsByDepartment).map((credit) => (
          <ListItem
            key={credit.creditId}
            button
            onClick={() => history.push(`/person/${credit.id}`)}
          >
            <ListItemAvatar>
              <Avatar src={makeTMDbImageURL(2, credit)} />
            </ListItemAvatar>
            <ListItemText
              primary={credit.name}
              secondary={credit.character || credit.job}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
