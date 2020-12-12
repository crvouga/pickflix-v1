import { IEmailLogic } from "../../app/email";
import { Emitter, Events } from "../../app/events";
import { PaginationOptions } from "../../app/pagination";
import { PermissionType } from "../../lists/models";
import { IAutoListRepository } from "../../lists/repositories/auto-list-repository";
import { IListRepository } from "../../lists/repositories/list-repository";
import { IPermissionRepository } from "../../lists/repositories/permission-repository";
import { IReviewRepository } from "../../reviews/repositories/review-repository";
import { UserAggergation } from "../models";
import { CredentialType } from "../models/make-credential";
import {
  EmailAddress,
  updateUser,
  User,
  UserId,
  Username,
} from "../models/make-user";
import { ICredentialRepository } from "../repositories/credential-repository";
import { IUserRepository } from "../repositories/user-repository";
import {
  createUserWithPassword,
  verifyEmailAddressAndPassword,
} from "./create-verify";
import {
  getResetPasswordEmail,
  resetPassword,
  sendResetPasswordEmail,
} from "./reset-password";

export class UserLogic {
  userRepository: IUserRepository;
  credentialRepository: ICredentialRepository;
  listRepository: IListRepository;
  autoListRepository: IAutoListRepository;
  reviewRepository: IReviewRepository;
  eventEmitter: Emitter<Events>;
  permissionRepository: IPermissionRepository;
  emailLogic: IEmailLogic;

  constructor({
    eventEmitter,
    emailLogic,
    userRepository,
    credentialRepository,
    listRepository,
    autoListRepository,
    reviewRepository,
    permissionRepository,
  }: {
    userRepository: IUserRepository;
    credentialRepository: ICredentialRepository;
    listRepository: IListRepository;
    autoListRepository: IAutoListRepository;
    reviewRepository: IReviewRepository;
    eventEmitter: Emitter<Events>;
    emailLogic: IEmailLogic;
    permissionRepository: IPermissionRepository;
  }) {
    this.eventEmitter = eventEmitter;
    this.emailLogic = emailLogic;
    this.credentialRepository = credentialRepository;
    this.userRepository = userRepository;
    this.listRepository = listRepository;
    this.autoListRepository = autoListRepository;
    this.reviewRepository = reviewRepository;
    this.permissionRepository = permissionRepository;
  }

  getResetPasswordEmail = getResetPasswordEmail;
  sendResetPasswordEmail = sendResetPasswordEmail;
  resetPassword = resetPassword;

  verifyEmailAddressAndPassword = verifyEmailAddressAndPassword;
  createUserWithPassword = createUserWithPassword;

  async getPasswordCredential({ userId }: { userId: UserId }) {
    const [passwordCredential] = await this.credentialRepository.find({
      userId,
      credentialType: CredentialType.password,
    });

    if (!passwordCredential) {
      throw new Error("User does not have password");
    }

    return passwordCredential;
  }

  async getUsers(
    spec:
      | { username: Username }
      | { id: UserId }
      | { emailAddress: EmailAddress }
  ) {
    return await this.userRepository.find([spec]);
  }

  async getUser(
    spec:
      | { username: Username }
      | { id: UserId }
      | { emailAddress: EmailAddress }
  ) {
    const [user] = await this.userRepository.find([spec]);

    if (!user) {
      throw new Error("User does not exists");
    }

    return user;
  }

  async aggergateUser(user: User): Promise<UserAggergation> {
    const [
      reviewCount,
      editorListCount,
      ownerListCount,
      autoListCount,
    ] = await Promise.all([
      this.reviewRepository.count({ authorId: user.id }),
      this.permissionRepository.count({
        permissionType: PermissionType.Editor,
        userId: user.id,
      }),
      this.listRepository.count({ ownerId: user.id }),
      this.autoListRepository.count({ ownerId: user.id }),
    ]);

    return {
      user,
      reviewCount,
      editorListCount,
      ownerListCount,
      listCount: editorListCount + ownerListCount,
      autoListCount,
    };
  }

  async getUserAggergations(
    spec:
      | {
          id: UserId;
        }
      | {
          username: Username;
        }
      | {
          emailAddress: EmailAddress;
        },
    pagination?: PaginationOptions
  ) {
    const users = await this.userRepository.find([spec], {
      pagination,
    });

    const userAggergations = await Promise.all(
      users.map((user) => this.aggergateUser(user))
    );

    return userAggergations;
  }

  async searchByUsernameAndDisplayName(
    query: string,
    pagination?: PaginationOptions
  ) {
    const results = await this.userRepository.search(
      query,
      ["username", "displayName"],
      {
        pagination,
      }
    );

    return results;
  }

  async editUser({
    id,
    ...edits
  }: { id: UserId } & {
    username?: string;
    displayName?: string;
    emailAddress?: string;
  }) {
    const user = await this.getUser({ id });

    const updated = updateUser(user, edits);

    this.userRepository.update(id, updated);

    return updated;
  }
}
