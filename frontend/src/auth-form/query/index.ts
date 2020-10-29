import { BackendAPI } from "../../backend-api";

export const queryKeys = {};

export const postForgotPassword = async ({
  emailAddress,
  redirectUrl,
}: {
  emailAddress: string;
  redirectUrl: string;
}) => {
  const { data } = await BackendAPI.post<undefined>("/api/password/forgot", {
    emailAddress,
    redirectUrl,
  });
  return data;
};

export const putPasswordReset = async (params: {
  newPassword: string;
  resetPasswordToken: string;
}) => {
  const { data } = await BackendAPI.put<undefined>(
    "/api/password/reset",
    params
  );
  return data;
};
