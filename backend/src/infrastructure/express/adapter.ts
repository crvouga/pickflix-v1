import express from 'express';
import {HttpRequest, HttpController} from '../../types/http';

const mapExpressRequestToHttpRequest = (req: express.Request): HttpRequest => {
  return {
    method: req.method,
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body,
  };
};

export default (handle: HttpController) => async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const request = mapExpressRequestToHttpRequest(req);

    const response = await handle(request);

    if (response.headers) {
      res.set(response.headers);
    }

    res.type('json');
    if (response.statusCode) {
      res.status(response.statusCode);
    }
    res.json(response.body);
  } catch (error) {
    res.status(500);
  }
};
