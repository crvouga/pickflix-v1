import actions from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import * as selectors from "./selectors";
import * as constants from "./constants";
export default {
  ...constants,
  reducer,
  actions,
  selectors,
  saga,
};
