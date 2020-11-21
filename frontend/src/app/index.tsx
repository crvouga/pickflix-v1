import React from "react";
import Providers from "./Providers";
import Routes from "./Routes";
import useDisableZoom from "./useDisableZoom";

export default () => {
  useDisableZoom();
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};
