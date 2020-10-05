declare module "read-more-react/dist/utils/trimText" {
  export default function trimText(
    text: string,
    min?: number,
    ideal?: number,
    max?: number
  ): [string, string];
}
