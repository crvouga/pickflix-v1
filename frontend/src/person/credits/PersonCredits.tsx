import { Box, IconButton, Tab, Tabs, Toolbar } from "@material-ui/core";
import GridOnIcon from "@material-ui/icons/GridOn";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import {
  PersonDetailsResponse,
  PersonMovieCreditsResponse,
} from "../../tmdb/types";
import PersonCreditsCast from "./PersonCreditsCast";
import PersonCreditsCrew from "./PersonCreditsCrew";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
const ToggleButtons = () => {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        <ViewComfyIcon />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const TabPanel = (props: {
  children?: React.ReactNode;
  index: any;
  value: any;
}) => {
  const { children, value, index } = props;

  return (
    <Box hidden={value !== index}>
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </Box>
  );
};

type Props = {
  details: PersonDetailsResponse;
  credits: PersonMovieCreditsResponse;
};

export default ({ details, credits }: Props) => {
  const { cast, crew } = credits;

  const knownForCast = details.knownForDepartment.toLowerCase() === "acting";

  const [value, setValue] = React.useState(knownForCast ? 0 : 1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <Toolbar>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <SortIcon />
        </IconButton>
      </Toolbar>
      <Box paddingX={2} paddingBottom={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab disabled={cast.length === 0} label={`Cast · ${cast.length}`} />
          <Tab disabled={crew.length === 0} label={`Crew · ${crew.length}`} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <PersonCreditsCast cast={cast} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <PersonCreditsCrew crew={crew} />
      </TabPanel>
    </React.Fragment>
  );
};
