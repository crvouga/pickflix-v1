import React from "react";

type Props = React.PropsWithChildren<{ count: number }>;

export default ({ count, children }: Props) => {
  return (
    <React.Fragment>
      {[...Array(count)].map((_, index) => (
        <React.Fragment key={index}>{children}</React.Fragment>
      ))}
    </React.Fragment>
  );
};
