import { AxiosInstance } from "axios";
import { Email, IEmailLogic } from ".";

/** Resend adapter for the existing application email port. */
export class ResendEmailLogic implements IEmailLogic {
  constructor(private readonly dependencies: {
    http: Pick<AxiosInstance, "post">;
    apiKey: string;
  }) {}

  async sendEmail(email: Email): Promise<void> {
    try {
      const response = await this.dependencies.http.post(
        "https://api.resend.com/emails",
        { ...email, to: [email.to] },
        {
          headers: { Authorization: `Bearer ${this.dependencies.apiKey}` },
          timeout: 10000,
        }
      );
      if (!response.data || !response.data.id) {
        throw new Error("Missing Resend email ID");
      }
    } catch (error) {
      // Axios errors contain request headers and password-reset links. Keep
      // those out of the API error response and logs.
      throw new Error("Email delivery failed");
    }
  }
}
