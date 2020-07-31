import actions from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import selectors from "./selectors";
import constants from "./constants";

export default {
  reducer,
  saga,
  selectors,
  actions,
  ...constants,
};
