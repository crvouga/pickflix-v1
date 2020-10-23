import backendAPI from "../../backendAPI";

export enum CredentialType {
  password = "password",
}
export const getCrendentialTypesForEmail = async (email: string) => {
  const { data } = await backendAPI.get<CredentialType[]>(
    "/api/auth/credentials",
    {
      params: {
        email,
      },
    }
  );
  return data;
};
