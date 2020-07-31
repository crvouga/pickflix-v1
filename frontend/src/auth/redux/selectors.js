export default {
  user: (state) => state.auth?.user,
  formStep: (state) => state.auth?.formStep,
  formValues: (state) => state.auth?.formValues,
  formErrors: (state) => state.auth?.formErrors || {},
  signInMethods: (state) => state.auth?.signInMethods,
  status: (state) => state.auth?.status,
};
