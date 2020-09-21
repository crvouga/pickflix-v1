export type BuildEventHandlerLogic = (_: {
  ListLogic: any;
}) => {
  [key: string]: Function;
};
