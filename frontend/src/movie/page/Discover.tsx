import { Box, Divider } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import discover from "../../discover/redux";
import { makeTag, Tag as ITag } from "../../discover/redux/types";
import Tag from "../../discover/Tag";
import router from "../../redux/router";
import { MovieDetails, MovieKeywords } from "../../tmdb/types";
import Title from "./Title";

interface Props {
  details: MovieDetails;
  keywords: MovieKeywords;
}

export default ({ details, keywords }: Props) => {
  const keywordTags = keywords.keywords.map(makeTag("keyword"));
  const genreTags = details.genres.map(makeTag("genre"));
  const companyTags = details.productionCompanies.map(makeTag("company"));
  const tags = [...genreTags, ...keywordTags, ...companyTags];

  const dispatch = useDispatch();

  const handleTagClick = (tag: ITag) => () => {
    dispatch(discover.actions.activateTags([tag]));
    dispatch(router.actions.push({ pathname: "/discover" }));
  };

  return (
    <Box paddingTop={2}>
      <Title>Discover</Title>
      <Box
        paddingLeft={2}
        marginBottom={1}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        {tags.map((tag) => (
          <Box key={tag.name} marginRight={1} marginBottom={1}>
            <Tag tag={tag} onClick={handleTagClick(tag)} />
          </Box>
        ))}
      </Box>
      <Divider />
    </Box>
  );
};
