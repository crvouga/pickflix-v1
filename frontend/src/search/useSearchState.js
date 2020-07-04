import { useState } from "react";
import useSearchHistory from "./useSearchHistory";
import useSearchResults from "./useSearchResults";

export default () => {
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  console.log({ text });
  const searchResults = useSearchResults({ text, page });
  const searchHistory = useSearchHistory();
  return {
    text,
    setText,
    page,
    setPage,
    ...searchResults,
    ...searchHistory,
  };
};
