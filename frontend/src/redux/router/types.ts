import { RouterState as ConnectReactRouterState } from "connected-react-router";

export enum ModalName {
  SignIn = "SignIn",
  SaveToList = "SaveToList",
  CreateList = "CreateList",
  VideoPlayer = "VideoPlayer",
  DiscoverSearch = "DiscoverSearch",
}

export type ModalProps = {
  movieId?: string;
  [key: string]: any;
};

export interface ModalState {
  isOpen: boolean;
  props: ModalProps;
}

export type RouterLocationState = {
  [key in ModalName]: ModalState;
};

export interface RouterState
  extends ConnectReactRouterState<RouterLocationState> {}
