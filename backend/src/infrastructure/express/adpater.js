const adaptRequest = (req) => {
  return {
    method: req.method,
    headers: req.headers,
    pathParams: req.params,
    body: req.body,
  };
};

module.exports = (handle) => async (req, res) => {
  try {
    const request = adaptRequest(req);

    const response = await handle(request);

    if (response.headers) {
      res.set(response.headers);
    }
    res.type("json");
    if (response.statusCode) {
      res.status(response.statusCode);
    }
    res.json(response.body);
  } catch (error) {
    res.status(500);
  }
};
