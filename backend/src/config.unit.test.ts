describe("production email configuration", () => {
  const original = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...original,
      NODE_ENV: "production",
      YOUTUBE_API_KEY: "test",
      TMDB_API_READ_ACCESS_TOKEN: "test",
      DATABASE_URL: "postgres://unused/pickflix_test",
      RESEND_API_KEY: "re_test",
      EMAIL_FROM: "test@example.com",
      PICKFLIX_SECRET: "test-app-secret",
      PICKFLIX_SESSION_SECRET: "test-session-secret",
    };
    delete process.env.SEND_GRID_API_KEY;
  });
  afterEach(() => { process.env = original; });

  it("starts with Resend credentials and no legacy SendGrid key", () => {
    const { secrets } = require("./config");
    expect(secrets.resendApiKey).toBe("re_test");
    expect(secrets.emailFrom).toBe("test@example.com");
  });

  it("fails early when Resend credentials are missing", () => {
    delete process.env.RESEND_API_KEY;
    expect(() => require("./config")).toThrow("RESEND_API_KEY required");
  });
});
