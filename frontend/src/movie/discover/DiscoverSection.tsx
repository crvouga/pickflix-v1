import { Box, Chip, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import discover from "../../discover/redux";
import { makeTag, Tag as ITag } from "../../discover/redux/types";
import router from "../../redux/router";
import { MovieDetails, MovieKeywords } from "../../tmdb/types";
import HorizontalScroll from "../../common/components/HorizontalScroll";

interface Props {
  details: MovieDetails;
  keywords: MovieKeywords;
}

const TagScroll = ({
  tags,
  onClick,
}: {
  tags: ITag[];
  onClick: (tag: ITag) => void;
}) => {
  return (
    <HorizontalScroll>
      {tags.map((tag) => (
        <Box key={tag.id} p={1 / 2}>
          <Chip
            variant="outlined"
            clickable
            label={tag.name}
            onClick={() => onClick(tag)}
          />
        </Box>
      ))}
    </HorizontalScroll>
  );
};

export default ({ details, keywords }: Props) => {
  const keywordTags = keywords.keywords.map(makeTag("keyword"));
  const genreTags = details.genres.map(makeTag("genre"));
  const companyTags = details.productionCompanies.map(makeTag("company"));
  const tags = [...genreTags, ...keywordTags, ...companyTags];

  const dispatch = useDispatch();

  const handleTagClick = (tag: ITag) => {
    dispatch(discover.actions.setActiveTags([tag]));
    dispatch(router.actions.push({ pathname: "/discover" }));
  };

  return (
    <List>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{
            variant: "h6",
            style: { fontWeight: "bold" },
          }}
          primary="Explore"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{
            style: { fontWeight: "bold" },
          }}
          primary="Genres"
          secondary={<TagScroll tags={genreTags} onClick={handleTagClick} />}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{
            style: { fontWeight: "bold" },
          }}
          primary="Companies"
          secondary={<TagScroll tags={companyTags} onClick={handleTagClick} />}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primaryTypographyProps={{
            style: { fontWeight: "bold" },
          }}
          primary="Keywords"
          secondary={<TagScroll tags={keywordTags} onClick={handleTagClick} />}
        />
      </ListItem>
    </List>
  );
};
