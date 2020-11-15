export const omitFalsyValues = (obj: { [key: string]: any }) => {
  return Object.keys(obj).reduce(
    (acc, k) => (Boolean(obj[k]) ? { ...acc, [k]: obj[k] } : acc),
    {}
  );
};
