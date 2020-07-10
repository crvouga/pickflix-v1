import {
  Box,
  ButtonBase,
  Collapse,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";
import ChipScroll from "../../../common/components/ChipScroll";
import useBoolean from "../../../common/hooks/useBoolean";
import ActionBar from "./ActionBar";
momentDurationFormatSetup(moment);

const useStyles = makeStyles((theme) => ({
  fadeBottom: {
    "mask-image": "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
}));

export default ({ details }) => {
  const classes = useStyles();
  const isOverviewExpanded = useBoolean();
  const subtitle1 = [
    moment(details.releaseDate).format("Y"),
    moment.duration(details.runtime, "minutes").format("h[h] m[m]"),
  ].join(" • ");

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={0}>
        <Typography align="left" variant="h5" style={{ flex: 1 }}>
          {details.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle1}
        </Typography>

        <ChipScroll
          paddingY={1}
          chips={details.genres}
          getLabel={(_) => _.name}
        />
        <ActionBar />
      </Box>

      <Box
        onClick={isOverviewExpanded.toggle}
        className={clsx({ [classes.fadeBottom]: !isOverviewExpanded.value })}
        p={2}
        paddingTop={0}
        flexDirection="column"
        display="flex"
      >
        <Collapse collapsedHeight="10em" in={isOverviewExpanded.value}>
          {details.tagline !== details.overview && (
            <Typography align="center" style={{ fontWeight: "bold" }}>
              {details.tagline}
            </Typography>
          )}
          <Typography variant="body1" color="textSecondary">
            {details.overview}
          </Typography>
        </Collapse>
      </Box>
    </React.Fragment>
  );
};
