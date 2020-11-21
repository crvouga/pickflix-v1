export type Id = string & {isUUID: true};
export type MakeId = () => Id;
export type IsValidId = (id: string) => Id | false;
