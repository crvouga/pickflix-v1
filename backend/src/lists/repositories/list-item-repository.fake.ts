import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { ListItem } from "../models";
import { IListItemRepository } from "./types";

export class ListItemRepositoryHashMap
  extends GenericRepositoryHashMap<ListItem>
  implements IListItemRepository {
  constructor() {
    super({});
  }
}

export class ListItemRepositoryFileSystem
  extends GenericRepositoryFileSystem<ListItem>
  implements IListItemRepository {
  constructor() {
    super("listItems");
  }
}
