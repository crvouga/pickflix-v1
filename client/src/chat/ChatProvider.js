import * as R from "ramda";
import React, { useState } from "react";
import axios from "axios";
import ChatContext from "./ChatContext";
import useLocalStorage from "../common/hooks/useLocalStorage";

export const MESSAGE_CAPCITY = 10;

const tagsToDiscoverParameters = R.pipe(
  R.groupBy(R.prop("type")),
  ({
    person = [],
    keyword = [],
    genre = [],
    company = [],
    dateRange = [],
    sortBy = [],
  }) => ({
    withPeople: R.pluck("id", person),
    withKeywords: R.pluck("id", keyword),
    withGenres: R.pluck("id", genre),
    withCompanies: R.pluck("id", company),
    ...(sortBy.length === 0
      ? {}
      : {
          sortBy: R.head(sortBy).sortBy,
        }),
    ...(dateRange.length === 0
      ? {}
      : {
          "primary_release_date.gte": `${R.apply(
            Math.min,
            R.head(dateRange).range
          )}-01-01`,
          "primary_release_date.lte": `${R.apply(
            Math.max,
            R.head(dateRange).range
          )}-12-31`,
        }),
  })
);

const responseToMovies = R.pipe(R.propOr([], "results"));

export default ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);

  const sendMessage = (message) => {
    console.log(message);
    setMessageList(
      R.pipe(
        R.append(R.assoc("id", Math.random(), message)),
        R.takeLast(MESSAGE_CAPCITY)
      )
    );
    if (message.author !== "bot") {
      setIsLoading(true);
      axios
        .get("/api/tmdb/discover/movie", {
          params: tagsToDiscoverParameters(tags),
        })
        .then((response) => {
          setIsLoading(false);
          const movies = response.data.results || [];
          setTimeout(() => {
            sendMessage({ author: "bot", movies, tags });
          }, 1000);
        });
    }
  };

  const value = {
    text,
    setText,
    tags,
    setTags,
    messageList,
    sendMessage,
    isLoading,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
