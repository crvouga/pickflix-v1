import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import * as R from "ramda";
import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useMakeImageUrl from "../../api/useMakeImageUrl";
import { useQuery } from "react-query";
import axios from "axios";
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
  const makeImageUrl = useMakeImageUrl();
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
              <Avatar src={makeImageUrl(2, credit)} />
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
