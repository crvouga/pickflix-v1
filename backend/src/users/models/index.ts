import { User } from "./make-user";

export * from "./make-user";
export * from "./make-credential";
export * from "./make-user.fake";

export type UserAggergation = {
  user: User;
  reviewCount: number;
  editorListCount: number;
  ownerListCount: number;
  listCount: number;
  autoListCount: number;
};
