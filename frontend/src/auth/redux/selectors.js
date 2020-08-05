export default {
  user: (state) => state.auth?.user,
  status: (state) => state.auth?.status,
  error: (state) => state.auth?.error,
};
