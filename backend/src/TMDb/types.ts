export type Request = (_: {
  path: string;
  query: {[key: string]: any};
}) => Promise<any>;

export type TMDb = {
  request: Request;
};
