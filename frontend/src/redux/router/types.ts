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

const initialModalState: ModalState = {
  isOpen: false,
  props: {},
};

export type RouterLocationState = {
  [key in ModalName]: ModalState;
};

const initialRouterLocationState: RouterLocationState = {
  SignIn: initialModalState,
  SaveToList: initialModalState,
  CreateList: initialModalState,
  VideoPlayer: initialModalState,
  DiscoverSearch: initialModalState,
};
export type RouterState = {};

export const initialState: RouterState = {
  action: "PUSH",
  location: {
    pathname: "/",
    search: "",
    state: initialRouterLocationState,
    hash: "",
  },
};
