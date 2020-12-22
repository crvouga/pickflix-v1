import { uniqBy } from "ramda";

import useLocalStorage from "react-use-localstorage";

export type Entity = {
  id: string;
  mediaType: "movie";
  posterPath: string;
  title: string;
};
// | {
//     id: string;
//     mediaType: "person";
//     profilePath: string;
//     name: string;
//   };

export default () => {
  const [entitiesJSON, setEntitiesJSON] = useLocalStorage(
    "page-history",
    JSON.stringify([])
  );
  const entities = JSON.parse(entitiesJSON) as Entity[];
  const setEntities = (entities: Entity[]) => {
    setEntitiesJSON(JSON.stringify(entities));
  };

  const clear = () => {
    setEntities([]);
  };

  const push = (entity: Entity) => {
    switch (entity.mediaType) {
      case "movie":
        const newEntity: Entity = {
          mediaType: "movie",
          title: entity.title,
          posterPath: entity.posterPath,
          id: entity.id,
        };
        setEntities(uniqBy((_) => _.id, [newEntity, ...entities]));
        break;

      // case "person":
      //   pageHistoryState.push({
      //     mediaType: "person",
      //     name: entity.name,
      //     profilePath: entity.profilePath,
      //     id: entity.id,
      //   });
      //   break;
    }
  };

  return {
    push,
    entities,
    clear,
  };
};
