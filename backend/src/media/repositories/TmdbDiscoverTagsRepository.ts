import { GenericRepositoryFileSystem } from "../../app/data-store/repository/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/data-store/repository/generic-repository.hash-map";
import { GenericRepositoryQueryOptions } from "../../app/data-store/repository/types";
import {
  TmdbDiscoverTags,
  TmdbDiscoverTagsId,
} from "../models/tmdb-discover-tags";

export interface ITmdbDiscoverTagsRepository {
  find(
    spec: Partial<TmdbDiscoverTags>,
    options?: GenericRepositoryQueryOptions<TmdbDiscoverTags>
  ): Promise<TmdbDiscoverTags[]>;

  remove(id: TmdbDiscoverTagsId): Promise<void>;

  add(discoverTags: TmdbDiscoverTags): Promise<void>;
}

export class TmdbDiscoverTagsRepositoryHashMap
  implements ITmdbDiscoverTagsRepository {
  repository: GenericRepositoryHashMap<TmdbDiscoverTagsId, TmdbDiscoverTags>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<
      TmdbDiscoverTagsId,
      TmdbDiscoverTags
    >({});
  }

  async find(
    spec: Partial<TmdbDiscoverTags>,
    options?: GenericRepositoryQueryOptions<TmdbDiscoverTags>
  ) {
    return await this.repository.find([spec], options);
  }

  async remove(id: TmdbDiscoverTagsId) {
    await this.repository.remove([{ id }]);
  }

  async add(discoverTagsRecord: TmdbDiscoverTags) {
    await this.repository.add([discoverTagsRecord]);
  }
}

export class TmdbDiscoverTagsRepositoryFileSystem
  implements ITmdbDiscoverTagsRepository {
  repository: GenericRepositoryFileSystem<TmdbDiscoverTagsId, TmdbDiscoverTags>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<
      TmdbDiscoverTagsId,
      TmdbDiscoverTags
    >(filePath);
  }

  async find(
    spec: Partial<TmdbDiscoverTags>,
    options?: GenericRepositoryQueryOptions<TmdbDiscoverTags>
  ) {
    return await this.repository.find([spec], options);
  }

  async remove(id: TmdbDiscoverTagsId) {
    await this.repository.remove([{ id }]);
  }

  async add(tmdbDiscoverTags: TmdbDiscoverTags) {
    await this.repository.add([tmdbDiscoverTags]);
  }
}
