import {
  AppBar,
  Box,
  Button,
  DialogProps,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import matchSorter from "match-sorter";
import { groupBy } from "remeda";
import React, { useState } from "react";
import { ResponsiveDialog } from "../../common/components/ResponsiveDialog";
import SearchTextField from "../../search/input/SearchTextField";
import { PersonMovieCreditsResponse } from "../../media/tmdb/types";
import { closeModal } from "../../common/utility";
import PersonCreditListItem from "./PersonCreditListItem";

export default ({
  credits,
  ...props
}: { credits: PersonMovieCreditsResponse } & DialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [text, setText] = useState("");

  const filtered = matchSorter([...credits.cast, ...credits.crew], text, {
    keys: ["title", "job", "character"],
  });

  const groupedByDepartment = groupBy(filtered, (credit) =>
    "job" in credit ? credit.department || "Crew" : "Cast"
  );

  return (
    <ResponsiveDialog {...props}>
      <AppBar position="sticky" color="default" style={{ maxWidth: "100%" }}>
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
                closeModal(props);
              }}
            >
              Done
            </Button>
          )}
        </Box>
      </AppBar>
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
              <PersonCreditListItem key={credit.creditId} credit={credit} />
            ))}
          </React.Fragment>
        ))}
      </List>
    </ResponsiveDialog>
  );
};
