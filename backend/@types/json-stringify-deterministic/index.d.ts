declare module "json-stringify-deterministic" {
  function stringify<T>(obj: T): string;

  export = stringify;
}
