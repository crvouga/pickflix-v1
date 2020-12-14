import { Box, Typography, Switch, Divider } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { descend, head, sort, sortBy, thunkify } from "ramda";
import React from "react";
import { useQuery } from "react-query";
import useModal from "../app/modals/useModal";
import HorizontalScroll from "../common/components/HorizontalScroll";
import LoadingBox from "../common/components/LoadingBox";
import { ResponsiveDialog } from "../common/components/ResponsiveDialog";
import BaseTag from "./BaseTag";
import { getMovieCertifications, queryKeys } from "./query";
import {
  getDecades,
  SortByKey,
  sortByKeys,
  sortByKeyToName,
  TagType,
  yearRangeToName,
} from "./query/types";
import useDiscoverState from "./redux/useDiscoverState";
import { Skeleton } from "@material-ui/lab";

const ReleaseYearRangeSection = () => {
  const discoverTuneModal = useModal("DiscoverTune");
  const { activateTag } = useDiscoverState();

  const handleClick = (decade: [number, number]) => {
    activateTag({
      type: TagType.releaseYearRange,
      id: decade.toString(),
      range: decade,
    });

    discoverTuneModal.close();
  };

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={1}>
        <Typography variant="h6">Decades</Typography>
      </Box>

      <HorizontalScroll paddingX={2} p={1} marginBottom={1}>
        {sort(descend(head), getDecades()).map((decade) => (
          <Box key={decade.toString()} m={1 / 2}>
            <BaseTag
              clickable
              variant="outlined"
              label={yearRangeToName(decade)}
              onClick={thunkify(handleClick)(decade)}
            />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};

const SortBySection = () => {
  const discoverTuneModal = useModal("DiscoverTune");
  const { activateTag } = useDiscoverState();

  const handleClick = (sortBy: SortByKey) => {
    activateTag({
      type: TagType.sortBy,
      id: sortBy,
      sortBy,
    });
    discoverTuneModal.close();
  };

  return (
    <React.Fragment>
      <Box p={2} paddingBottom={1}>
        <Typography variant="h6">Sort By</Typography>
      </Box>
      <HorizontalScroll paddingX={2} p={1} marginBottom={1}>
        {sortByKeys.map((sortBy) => (
          <Box key={sortBy} marginRight={1} marginBottom={1}>
            <BaseTag
              clickable
              variant="outlined"
              label={sortByKeyToName(sortBy)}
              onClick={thunkify(handleClick)(sortBy)}
            />
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};

const CertificationsUS = () => {
  const discoverTuneModal = useModal("DiscoverTune");
  const { activateTag } = useDiscoverState();

  const handleClick = (certification: string) => {
    activateTag({
      type: TagType.certification,
      id: certification,
      certification,
      certificationCountry: "US",
    });
    discoverTuneModal.close();
  };
  const query = useQuery(queryKeys.certifications(), () =>
    getMovieCertifications()
  );

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return (
      <Box paddingX={2}>
        <Skeleton variant="rect" height="2.75em" width="100%" />
      </Box>
    );
  }

  const certificationsUS = sortBy((_) => _.order, query.data.certifications.US);

  return (
    <HorizontalScroll paddingX={2} p={1} marginBottom={1}>
      {certificationsUS.map((certification) => (
        <Box key={certification.certification} marginRight={1}>
          <BaseTag
            onClick={() => handleClick(certification.certification)}
            variant="outlined"
            clickable
            label={certification.certification}
          />
        </Box>
      ))}
    </HorizontalScroll>
  );
};

const CertificationSection = () => {
  return (
    <React.Fragment>
      <Box p={2} paddingBottom={1}>
        <Typography variant="h6">Rating</Typography>
      </Box>
      <CertificationsUS />
    </React.Fragment>
  );
};

const RuntimeRangeSection = () => {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" p={2} paddingBottom={4}>
        <Box flex={1}>
          <Typography variant="h6">Runtime</Typography>
        </Box>
        <Box>
          <Switch color="primary" />
        </Box>
      </Box>
      <Box paddingX={4}>
        <Slider value={value} onChange={handleChange} valueLabelDisplay="on" />
      </Box>
    </React.Fragment>
  );
};

export default () => {
  const { isOpen, close } = useModal("DiscoverTune");

  return (
    <ResponsiveDialog open={isOpen} onClose={close} showDoneButton>
      <Box paddingBottom={2}>
        <ReleaseYearRangeSection />
        <Divider />
        <SortBySection />
        <Divider />
        <CertificationSection />
        <Divider />
        <RuntimeRangeSection />
      </Box>
    </ResponsiveDialog>
  );
};
