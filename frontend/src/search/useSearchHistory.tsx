import { uniqBy } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { SearchResult } from "./query";
import { search } from "./redux/search";

export default () => {
  const history = useSelector(search.selectors.history);
  const dispatch = useDispatch();

  const push = (result: SearchResult) => {
    dispatch(
      search.actions.setHistory(
        uniqBy((result) => result.id, [result, ...history])
      )
    );
  };

  const remove = (result: SearchResult) => {
    dispatch(
      search.actions.setHistory(history.filter((_) => _.id !== result.id))
    );
  };

  return {
    history,
    push,
    remove,
  };
};
