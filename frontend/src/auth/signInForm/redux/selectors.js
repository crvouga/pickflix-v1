import { namespace } from "./constants";

export default {
  step: (state) => state[namespace].step,
  values: (state) => state[namespace].values,
  error: (state) => state[namespace].error,
  status: (state) => state[namespace].status,
};
