import { MailService } from "@sendgrid/mail";
import configuration from "../../app/configuration";

export type Email = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export interface IEmailLogic {
  sendEmail(email: Email): Promise<void>;
}

export class EmailLogicStub implements IEmailLogic {
  //@ts-ignore
  async sendEmail(email: Email) {}
}

export class EmailLogic implements IEmailLogic {
  emailService: MailService;

  constructor({ emailService }: { emailService: MailService }) {
    this.emailService = emailService;
    this.emailService.setApiKey(configuration.SEND_GRID_API_KEY);
  }

  async sendEmail(email: Email) {
    await this.emailService.send(email);
  }
}

export const buildEmailLogicTest = () => {
  return new EmailLogicStub();
};

export const buildEmailLogicDevelopment = ({
  emailService,
}: {
  emailService: MailService;
}) => {
  return new EmailLogic({ emailService });
};

export const buildEmailLogicProduction = ({
  emailService,
}: {
  emailService: MailService;
}) => {
  return new EmailLogic({ emailService });
};
