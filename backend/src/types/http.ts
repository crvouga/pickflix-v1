export interface HttpRequest {
  [key: string]: any;
  method: string;
}

export type HttpResponse = {
  [key: string]: any;
};

export type HttpController = (request: HttpRequest) => Promise<HttpResponse>;
