import { MailService } from "@sendgrid/mail";

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

  constructor({ emailService, apiKey }: { emailService: MailService; apiKey: string }) {
    this.emailService = emailService;
    this.emailService.setApiKey(apiKey);
  }

  async sendEmail(email: Email) {
    console.log("Sending email:", email);
    await this.emailService.send(email);
  }
}
