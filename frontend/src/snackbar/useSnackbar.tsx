import { useDispatch, useSelector } from "react-redux";
import { snackbar, SnackbarProps } from "./redux/snackbar";
import { bindActionCreators } from "redux";

export default () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(snackbar.actions, dispatch);
  const open = useSelector(snackbar.selectors.open);
  const props = useSelector(snackbar.selectors.props);
  return {
    ...actions,
    open,
    props,
  };
};
