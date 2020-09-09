export enum StatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Request = {
  [key: string]: any;
  method: Method | string;
  headers: {[key: string]: any};
  body: {[key: string]: any};
  pathParameters: {[key: string]: any};
  queryParameters: {[key: string]: any};
};

export type Response = {
  [key: string]: any;
  statusCode?: StatusCode | number;
  body?: {[key: string]: any};
};

export type Handler = (_: Request) => Promise<Response>;
export type Controller = {[key: string]: Handler};
