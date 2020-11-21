import { IRepository } from "../../common/unit-of-work/types";
import { AutoList, List, ListItem } from "../models";

export interface IListRepository extends IRepository<List> {}
export interface IListItemRepository extends IRepository<ListItem> {}
export interface IAutoListRepository extends IRepository<AutoList> {}
