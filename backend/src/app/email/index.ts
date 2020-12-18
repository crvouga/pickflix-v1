import { MailService } from "@sendgrid/mail";
import { secrets } from "../../config";

export type Email = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export interface IEmailLogic {
  sendEmail(email: Email): Promise<void>;
}

export const emailLogicStub: IEmailLogic = {
  sendEmail: async (email: Email) => {},
};

export class EmailLogic implements IEmailLogic {
  emailService: MailService;

  constructor({ emailService }: { emailService: MailService }) {
    this.emailService = emailService;
    this.emailService.setApiKey(secrets.sendGridApiKey);
  }

  async sendEmail(email: Email) {
    await this.emailService.send(email);
  }
}
