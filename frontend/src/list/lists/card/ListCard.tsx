import {
  Box,
  Card,
  CardHeaderProps,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import React from "react";
import { useHistory } from "react-router";
import { pluralize } from "../../../common/utility";
import AvatarUser from "../../../user/components/AvatarUser";
import { ListAggergation } from "../../query";
import ListImageBox from "./ListCardImage";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.spacing(1.5),
  },
  avatarGroup: {
    marginLeft: theme.spacing(1),
  },
}));

export default ({
  list,
}: {
  list: ListAggergation;
  CardHeaderProps?: CardHeaderProps;
}) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card onClick={() => history.push(`/list/${list.list.id}`)}>
      <Grid container direction="row">
        <Grid item>
          <Box p={1} width="90px">
            <ListImageBox list={list} width="100%" />
          </Box>
        </Grid>
        <Grid item zeroMinWidth xs>
          <Box
            paddingX={1}
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h5" noWrap>
              {list.list.title}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1" color="textSecondary" noWrap>
                {pluralize(list.listItemCount, "item")}
              </Typography>
              {list.editors.length > 0 && (
                <AvatarGroup className={classes.avatarGroup}>
                  <AvatarUser className={classes.small} user={list.owner} />
                  {list.editors.map((editor) => (
                    <AvatarUser
                      className={classes.small}
                      key={editor.id}
                      user={editor}
                    />
                  ))}
                </AvatarGroup>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};
