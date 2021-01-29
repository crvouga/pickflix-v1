import React from "react";
import { HorizontalSnapScroll } from "./HorizontalSnapScroll";
import { useHorizontalSnapScrollController } from "./useHorizontalSnapScrollController";

export * from "./HorizontalSnapScroll";
export * from "./useHorizontalSnapScrollController";

export default (props: React.PropsWithChildren<{}>) => {
  const controller = useHorizontalSnapScrollController();
  return <HorizontalSnapScroll controller={controller} {...props} />;
};
