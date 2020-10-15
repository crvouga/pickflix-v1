import {IUnitOfWork} from '../../unit-of-work/types';
import {Id} from '../../id/types';
import {makeLike} from '../models';

export class LikeLogic {
  unitOfWork: IUnitOfWork;
  constructor({unitOfWork}: {unitOfWork: IUnitOfWork}) {
    this.unitOfWork = unitOfWork;
  }

  async addLike(likeInfo: {userId: Id; entityId: Id}) {
    const like = makeLike(likeInfo);
    await this.unitOfWork.Likes.add([like]);
    return like;
  }

  async removeLike({id}: {id: Id}) {
    await this.unitOfWork.Likes.remove([{id}]);
  }
}
