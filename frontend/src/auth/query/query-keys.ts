export const queryKeys = {
  currentUser: () => ["user"],
  users: (email: string) => ["users", email],
};
