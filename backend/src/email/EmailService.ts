import { MailService } from "@sendgrid/mail";
import configuration from "../configuration";

export type Email = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export interface IEmailService {
  sendEmail(email: Email): Promise<void>;
}

export class EmailServiceStub implements IEmailService {
  //@ts-ignore
  async sendEmail(email: Email) {}
}

export class EmailService implements IEmailService {
  sgMail: MailService;

  constructor({ sgMail }: { sgMail: MailService }) {
    this.sgMail = sgMail;
    this.sgMail.setApiKey(configuration.SEND_GRID_API_KEY);
  }

  async sendEmail(email: Email) {
    await this.sgMail.send(email);
  }
}
