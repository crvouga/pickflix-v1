import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default (props: Props) => {
  return <div {...props} />;
};
