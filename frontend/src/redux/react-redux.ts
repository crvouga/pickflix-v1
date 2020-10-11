import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import { AppState } from "./types";

export const useSelector: TypedUseSelectorHook<AppState> = useSelectorRedux;
export const useDispatch = useDispatchRedux;
