import { EventEmitter } from "events";
import { IEmailService } from "../email/EmailService";
import {
  IUnitOfWork,
  PaginationOptions,
} from "../../common/unit-of-work/types";
import { CredentialType } from "../models/make-credential";
import { UserId, updateUser } from "../models/make-user";
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
  unitOfWork: IUnitOfWork;
  eventEmitter: EventEmitter;
  emailService: IEmailService;

  constructor({
    unitOfWork,
    eventEmitter,
    emailService,
  }: {
    unitOfWork: IUnitOfWork;
    eventEmitter: EventEmitter;
    emailService: IEmailService;
  }) {
    this.unitOfWork = unitOfWork;
    this.eventEmitter = eventEmitter;
    this.emailService = emailService;
  }

  getResetPasswordEmail = getResetPasswordEmail;
  sendResetPasswordEmail = sendResetPasswordEmail;
  resetPassword = resetPassword;

  verifyEmailAddressAndPassword = verifyEmailAddressAndPassword;
  createUserWithPassword = createUserWithPassword;

  async getPasswordCredential({ userId }: { userId: UserId }) {
    const { Credentials } = this.unitOfWork;

    const [passwordCredential] = await Credentials.find({
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
    return await this.unitOfWork.Users.find(userInfo);
  }

  async getUser(
    info: { username: string } | { id: UserId } | { emailAddress: string }
  ) {
    const { Users } = this.unitOfWork;

    const [user] = await Users.find(info);

    if (!user) {
      throw new Error("User does not exists");
    }

    return user;
  }

  async getUserAggergation(
    info: { username: string } | { id: UserId } | { emailAddress: string }
  ) {
    const { AutoLists, Reviews, Lists } = this.unitOfWork;

    const user = await this.getUser(info);

    const [reviewCount, listCount, autoListCount] = await Promise.all([
      Reviews.count({ authorId: user.id }),
      Lists.count({ ownerId: user.id }),
      AutoLists.count({ ownerId: user.id }),
    ]);

    return {
      user,
      reviewCount,
      listCount,
      autoListCount,
    };
  }

  async getCredentialTypesForEmailAddress({
    emailAddress,
  }: {
    emailAddress: string;
  }) {
    const [user] = await this.unitOfWork.Users.find({ emailAddress });

    if (!user) {
      return [];
    }

    const credentials = await this.unitOfWork.Credentials.find({
      userId: user.id,
    });

    const credentialTypes = credentials.map((credential) => credential.type);

    return credentialTypes;
  }

  async searchByUsernameAndDisplayName(
    query: string,
    pagination?: PaginationOptions
  ) {
    const { Users } = this.unitOfWork;

    const results = await Users.search(query, ["username", "displayName"], {
      pagination,
    });

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
    const { Users } = this.unitOfWork;

    const user = await this.getUser({ id });

    const updated = updateUser(user, edits);

    await Users.update(updated);

    return updated;
  }
}
