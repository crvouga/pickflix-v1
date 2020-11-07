import { RepositoryHashMap } from "../../unit-of-work/repository.hash-map";
import { ListItem } from "../models/types";
import { IListItemRepository } from "./types";
import { RepositoryFileSystem } from "../../unit-of-work/repository.file-system";

export class ListItemRepositoryHashMap
  extends RepositoryHashMap<ListItem>
  implements IListItemRepository {
  constructor() {
    super();
  }
}

export class ListItemRepositoryFileSystem
  extends RepositoryFileSystem<ListItem>
  implements IListItemRepository {
  constructor() {
    super("listItems");
  }
}
