import { PaginationOptions } from "../../app/data-access/types";
import { IEmailLogic } from "../../app/email";
import { Emitter, Events } from "../../app/events";
import { removeNullOrUndefinedEntries } from "../../app/utils";
import { IAutoListRepository } from "../../lists/repositories/auto-list-repository";
import { IListRepository } from "../../lists/repositories/list-repository";
import { IReviewRepository } from "../../reviews/repositories/review-repository";
import { CredentialType } from "../models/make-credential";
import { updateUser, User, UserId } from "../models/make-user";
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
  emailLogic: IEmailLogic;

  constructor({
    eventEmitter,
    emailLogic,
    userRepository,
    credentialRepository,
    listRepository,
    autoListRepository,
    reviewRepository,
  }: {
    userRepository: IUserRepository;
    credentialRepository: ICredentialRepository;
    listRepository: IListRepository;
    autoListRepository: IAutoListRepository;
    reviewRepository: IReviewRepository;
    eventEmitter: Emitter<Events>;
    emailLogic: IEmailLogic;
  }) {
    this.eventEmitter = eventEmitter;
    this.emailLogic = emailLogic;
    this.credentialRepository = credentialRepository;
    this.userRepository = userRepository;
    this.listRepository = listRepository;
    this.autoListRepository = autoListRepository;
    this.reviewRepository = reviewRepository;
  }

  getResetPasswordEmail = getResetPasswordEmail;
  sendResetPasswordEmail = sendResetPasswordEmail;
  resetPassword = resetPassword;

  verifyEmailAddressAndPassword = verifyEmailAddressAndPassword;
  createUserWithPassword = createUserWithPassword;

  async getPasswordCredential({ userId }: { userId: UserId }) {
    const [passwordCredential] = await this.credentialRepository.find({
      userId,
      type: CredentialType.password,
    });

    if (!passwordCredential) {
      throw new Error("User does not have password");
    }

    return passwordCredential;
  }

  async getUsers(
    userInfo: { username: string } | { id: UserId } | { emailAddress: string }
  ) {
    return await this.userRepository.find(userInfo);
  }

  async getUser(
    info: { username: string } | { id: UserId } | { emailAddress: string }
  ) {
    const [user] = await this.userRepository.find(info);

    if (!user) {
      throw new Error("User does not exists");
    }

    return user;
  }

  async aggergateUser(user: User) {
    const [reviewCount, listCount, autoListCount] = await Promise.all([
      this.reviewRepository.count({ authorId: user.id }),
      this.listRepository.count({ ownerId: user.id }),
      this.autoListRepository.count({ ownerId: user.id }),
    ]);

    return {
      user,
      reviewCount,
      listCount,
      autoListCount,
    };
  }

  async getUserAggergations(
    userSpec: {
      id?: UserId;
      username?: string;
      emailAddress?: string;
    },
    pagination?: PaginationOptions
  ) {
    const users = await this.userRepository.find(
      removeNullOrUndefinedEntries(userSpec),
      {
        pagination,
      }
    );

    const userAggergations = await Promise.all(
      users.map((user) => this.aggergateUser(user))
    );

    return userAggergations;
  }

  async getCredentialTypesForEmailAddress({
    emailAddress,
  }: {
    emailAddress: string;
  }) {
    const [user] = await this.userRepository.find({ emailAddress });

    if (!user) {
      return [];
    }

    const credentials = await this.credentialRepository.find({
      userId: user.id,
    });

    const credentialTypes = credentials.map((credential) => credential.type);

    return credentialTypes;
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
