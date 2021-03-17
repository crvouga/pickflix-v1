import React from "react";
import ResponsiveNavigation from "../../app/navigation/ResponsiveNavigation";

type PageProps = React.PropsWithChildren<{}>;

export default ({ children }: PageProps) => {
  return (
    <React.Fragment>
      <ResponsiveNavigation />

      {children}
    </React.Fragment>
  );
};
