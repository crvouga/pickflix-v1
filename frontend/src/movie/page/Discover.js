import { Box, Chip, Divider, makeStyles } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import { useDispatch } from "react-redux";
import router from "../../common/redux/router";
import discover from "../../discover/redux";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  chipRoot: {
    maxWidth: "100%",
    overflowX: "scroll",
  },
}));

export default ({ details, keywords }) => {
  const classes = useStyles();
  const chipsByType = {
    genre: details.genres,
    keyword: keywords,
    company: details.productionCompanies,
  };

  const dispatch = useDispatch();
  const handleClickChip = (type, tag) => () => {
    const newTags = [R.assoc("type", type, tag)];
    dispatch(discover.actions.selected(newTags));
    dispatch(router.actions.push("/discover"));
  };

  return (
    <Box paddingTop={2}>
      <Title>Discover</Title>
      <Box
        paddingLeft={2}
        marginBottom={1}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        {R.toPairs(chipsByType).map(([type, chips]) =>
          chips.map((chip) => (
            <Box key={chip.name} marginRight={1} marginBottom={1}>
              <Chip
                classes={{ root: classes.chipRoot }}
                onClick={handleClickChip(type, chip)}
                clickable
                label={chip.name}
                variant="outlined"
                style={{ fontWeight: "bold", fontSize: "1.25em" }}
              />
            </Box>
          ))
        )}
      </Box>
      <Divider />
    </Box>
  );
};
