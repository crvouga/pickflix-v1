import sgMail from "@sendgrid/mail";
import { EmailService } from "./EmailService";

export const emailService = new EmailService({
  sgMail,
});

export * from "./EmailService";
