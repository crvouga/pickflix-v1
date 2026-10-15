import { ResendEmailLogic } from "./resend";

const email = {
  from: "Pickflix <noreply@resend.chrisvouga.dev>",
  to: "person@example.com",
  subject: "Pickflix Password Reset",
  html: '<a href="https://pickflix.chrisvouga.dev/reset?token=private">Reset</a>',
};

it("adapts the email port to Resend's authenticated API", async () => {
  const http = { post: jest.fn().mockResolvedValue({ data: { id: "email-id" } }) };
  const adapter = new ResendEmailLogic({ http, apiKey: "re_private" });
  await adapter.sendEmail(email);
  expect(http.post).toHaveBeenCalledWith(
    "https://api.resend.com/emails",
    { ...email, to: [email.to] },
    { headers: { Authorization: "Bearer re_private" }, timeout: 10000 }
  );
});

it("rejects provider and network failures without exposing credentials or reset links", async () => {
  const http = { post: jest.fn().mockRejectedValue({
    message: "re_private " + email.html,
    config: { headers: { Authorization: "Bearer re_private" } },
  }) };
  await expect(new ResendEmailLogic({ http, apiKey: "re_private" }).sendEmail(email))
    .rejects.toThrow("Email delivery failed");
});

it("rejects unsuccessful provider responses without an email ID", async () => {
  const http = { post: jest.fn().mockResolvedValue({ data: { message: "invalid sender" } }) };
  await expect(new ResendEmailLogic({ http, apiKey: "re_private" }).sendEmail(email))
    .rejects.toThrow("Email delivery failed");
});
