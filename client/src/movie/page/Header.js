import { Box, Typography } from "@material-ui/core";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";
import ChipScroll from "../../common/components/ChipScroll";
import ExpandHeight from "../../common/components/ExpandHeight";
import useBoolean from "../../common/hooks/useBoolean";
import ActionBar from "./ActionBar";
momentDurationFormatSetup(moment);

const toCertification = (releaseDates) => {
  const result = releaseDates?.results.find(
    ({ iso31661 }) => iso31661 === "US"
  );

  if (!result) {
    return null;
  }

  const certification = result.releaseDates
    .map((_) => _.certification)
    .find((_) => _ !== "");

  return certification;
};

const toSubtitle1 = ({ details, releaseDates }) =>
  [
    details.releaseDate && moment(details.releaseDate).format("Y"),
    details.runtime &&
      moment.duration(details.runtime, "minutes").format("h[h] m[m]"),
    toCertification(releaseDates),
  ]
    .filter((_) => _)
    .join(" • ");

export default ({ details, releaseDates }) => {
  const isOverviewExpanded = useBoolean();
  const subtitle1 = toSubtitle1({ details, releaseDates });

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

      <Box p={2} paddingTop={0} flexDirection="column" display="flex">
        {details.tagline !== details.overview && (
          <Typography align="center" style={{ fontWeight: "bold" }}>
            {details.tagline}
          </Typography>
        )}
        <ExpandHeight
          collapsedHeight="10em"
          in={isOverviewExpanded.value}
          onClick={isOverviewExpanded.toggle}
        >
          <Typography variant="body1" color="textSecondary">
            {details.overview}
          </Typography>
        </ExpandHeight>
      </Box>
    </React.Fragment>
  );
};
