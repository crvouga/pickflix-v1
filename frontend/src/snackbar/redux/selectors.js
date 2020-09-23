export const snackbar = (state) => state?.snackbar || {};
export const isOpen = (state) => snackbar(state).isOpen;
export const info = (state) => snackbar(state).info;
