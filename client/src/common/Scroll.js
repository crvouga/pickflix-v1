import { Box, Chip, makeStyles, Typography } from "@material-ui/core";
import * as R from "ramda";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    overflowX: "auto",
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  scroll: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "scroll",
    transform: "translateZ(0)",
  },
  itemContainer: {
    margin: ({ spacing = 1 }) => theme.spacing(spacing),
  },
}));

const toTitle = (s) => s.replace(/(^|\s)\S/g, (t) => t.toUpperCase());

const Scroll = ({
  items = [],
  title = "",
  itemByKey = {},
  renderItem = () => {},
  initialKey,
  emptyText = "None",
}) => {
  initialKey = R.isNil(initialKey) ? R.head(R.keys(itemByKey)) : initialKey;
  const classes = useStyles();

  const [selectedKey, setSelectedKey] = useState(initialKey);

  return (
    <div>
      {title && (
        <Typography variant="h6" style={{ marginLeft: 12, fontWeight: "bold" }}>
          {title}
        </Typography>
      )}
      <div className={classes.scroll}>
        {R.keys(itemByKey).map((key) => (
          <Chip
            className={classes.chip}
            clickable
            key={key}
            label={toTitle(key)}
            variant={selectedKey === key ? "default" : "outlined"}
            onClick={() => setSelectedKey(key)}
          />
        ))}
      </div>
      <div className={classes.scroll}>
        {R.propOr(items, selectedKey, itemByKey).map((item) => (
          <div
            key={`${selectedKey}.${item.id}.${item.job}.${item.deparment}`}
            className={classes.itemContainer}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
      {R.isEmpty(items) && R.isEmpty(itemByKey) && (
        <Typography color="textSecondary">{emptyText}</Typography>
      )}
    </div>
  );
};

export default Scroll;
