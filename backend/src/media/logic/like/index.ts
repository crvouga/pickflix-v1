import {TmdbMedia, tmdbMediaToEntity} from '../../models/types';
import {MediaLogic} from '../build';

export type LikeStatus = 'liked' | 'not liked';

export async function toggleLike(
  this: MediaLogic,
  tmdbMedia: TmdbMedia
): Promise<LikeStatus> {
  const {
    unitOfWork: {Likes},
  } = this;

  const entity = tmdbMediaToEntity(tmdbMedia);

  const existing = await Likes.find(entity);
  if (existing.length === 0) {
    await Likes.add([entity]);
    return 'liked';
  } else {
    await Likes.remove([entity]);
    return 'not liked';
  }
}

export async function addLike(this: MediaLogic, tmdbMedia: TmdbMedia) {
  const entity = tmdbMediaToEntity(tmdbMedia);
  await this.unitOfWork.Likes.add([entity]);
}

export async function removeLike(this: MediaLogic, tmdbMedia: TmdbMedia) {
  const entity = tmdbMediaToEntity(tmdbMedia);
  await this.unitOfWork.Likes.remove([entity]);
}

export async function isLiked(this: MediaLogic, tmdbMedia: TmdbMedia) {
  const entity = tmdbMediaToEntity(tmdbMedia);
  const found = await this.unitOfWork.Likes.find(entity);
  return found.length > 0;
}
