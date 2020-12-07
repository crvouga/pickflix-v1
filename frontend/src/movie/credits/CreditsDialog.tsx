import {
  AppBar,
  Box,
  Button,
  DialogProps,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { ResponsiveDialog } from "../../common/components/ResponsiveDialog";
import SearchTextField from "../../search/input/SearchTextField";
import { MovieCredits } from "../../media/tmdb/types";
import matchSorter from "match-sorter";
import CreditsListItem from "./CreditsListItem";
import { groupBy } from "ramda";
import { APP_BAR_HEIGHT } from "../../app/navigation/constants";
import { AppBarGutter } from "../../common/components/AppBarGutter";

const close = (props: DialogProps) => {
  if (props.onClose) {
    props.onClose({}, "backdropClick");
  }
};

export default ({
  credits,
  ...props
}: { credits: MovieCredits } & DialogProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [text, setText] = useState("");

  const filtered = matchSorter([...credits.cast, ...credits.crew], text, {
    keys: ["name", "department", "job", "character"],
    // threshold: matchSorter.rankings.NO_MATCH,
  });

  const groupedByDepartment = groupBy(
    (credit) => ("job" in credit ? credit.department || "Crew" : "Cast"),
    filtered
  );

  return (
    <ResponsiveDialog fullScreen={isMobile} {...props}>
      <AppBar position="fixed" color="default">
        <Box p={1} display="flex">
          <SearchTextField
            placeholder="Search Credits"
            onChange={(e) => setText(e.target.value)}
            autoFocus={false}
          />
          {isMobile && (
            <Button
              size="large"
              color="primary"
              onClick={() => {
                close(props);
              }}
            >
              Done
            </Button>
          )}
        </Box>
      </AppBar>
      <AppBarGutter />
      <List>
        {Object.entries(groupedByDepartment).map(([department, credits]) => (
          <React.Fragment key={department}>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ variant: "h6" }}
                primary={department}
              />
            </ListItem>
            {credits.map((credit) => (
              <CreditsListItem key={credit.creditId} credit={credit} />
            ))}
          </React.Fragment>
        ))}
      </List>
    </ResponsiveDialog>
  );
};
