import {
  Box,
  Button,
  DialogProps,
  List,
  ListItem,
  ListItemText,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import matchSorter from "match-sorter";
import { groupBy } from "ramda";
import React, { useState } from "react";
import { AppBarGutter } from "../../common/components/AppBarGutter";
import {
  ResponsiveDialog,
  RESPONSIVE_DIALOG_MAX_WIDTH,
} from "../../common/components/ResponsiveDialog";
import { MovieCredits } from "../../media/tmdb/types";
import SearchTextField from "../../search/input/SearchTextField";
import CreditsListItem from "./CreditsListItem";

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
  });

  const groupedByDepartment = groupBy(
    (credit) => ("job" in credit ? credit.department || "Crew" : "Cast"),
    filtered
  );

  return (
    <ResponsiveDialog {...props}>
      <Box
        component={Paper}
        zIndex={2}
        p={1}
        display="flex"
        position="fixed"
        width="100%"
        maxWidth={RESPONSIVE_DIALOG_MAX_WIDTH}
      >
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
