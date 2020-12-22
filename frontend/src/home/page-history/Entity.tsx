import React from "react";
import Poster from "../../movie/components/MoviePosterCard";
import { Entity } from "./usePageHistory";

type Props = {
  entity: Entity;
};

export default ({ entity }: Props) => {
  switch (entity.mediaType) {
    case "movie":
      return <Poster movie={entity} />;

    // case "person":
    //   return (
    //     <React.Fragment>
    //       <Box paddingBottom={1} display="flex" justifyContent="center">
    //         <PersonAvatar person={entity} />
    //       </Box>
    //       <Typography noWrap align="center" variant="h6">
    //         {entity.name}
    //       </Typography>
    //     </React.Fragment>
    //   );
    default:
      return null;
  }
};
