/* DOCS: https://amplitude.github.io/redux-query/docs/network-interfaces */
import axios from "axios";

export default (axiosInstance) => {
  return (url, method, { body, headers, credentials }) => {
    const cancelSource = axios.CancelToken.source();

    return {
      abort: () => {
        cancelSource.cancel();
      },
      execute: (callback) => {
        axiosInstance({
          cancelToken: cancelSource.token,
          url,
          method,
          data: body,
          body,
          headers,
          credentials,
        })
          .then((response) => {
            callback(
              undefined,
              response.status,
              response.data,
              undefined,
              response.headers
            );
          })
          .catch((error) => {
            callback(error);
          });
      },
    };
  };
};
