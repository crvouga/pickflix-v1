import { RepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { RepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { ListItem } from "../models";
import { IListItemRepository } from "./types";

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
