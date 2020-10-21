import { useDispatch } from "react-redux";
import { snackbar, SnackbarProps } from "./redux/snackbar";

export default () => {
  const dispatch = useDispatch();

  const display = (props: SnackbarProps) => {
    dispatch(snackbar.actions.display(props));
  };

  return {
    display,
  };
};
