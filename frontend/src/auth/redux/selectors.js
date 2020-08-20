export const user = (state) => state.auth?.user;
export const status = (state) => state.auth?.status;
export const error = (state) => state.auth?.error;
export const isAuthenticated = (state) => Boolean(user(state));
