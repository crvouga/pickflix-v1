import * as R from "ramda";
import useLocalStorage from "../../common/hooks/useLocalStorage";

export default () => {
  const [history, setHistory] = useLocalStorage("searchHistory", []);

  const addHistory = (result) => {
    setHistory(R.pipe(R.prepend(result), R.uniqBy(R.prop("id")), R.take(100)));
  };

  const subtractHistory = (result) => {
    setHistory(
      R.pipe(R.reject(R.where({ id: R.eqBy(R.toString, result.id) })))
    );
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addHistory,
    subtractHistory,
    clearHistory,
  };
};
