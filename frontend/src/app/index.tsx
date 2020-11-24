import React from "react";
import Providers from "./providers/Providers";
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
