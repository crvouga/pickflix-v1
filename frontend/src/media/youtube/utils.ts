import moment from "moment";
import numeral from "numeral";

export const toShorthand = (number: number) =>
  numeral(number).format("0.0a").replace(".0", "").toUpperCase();

export const toCommas = (number: number) => numeral(number).format("0,0");

export const toAgo = (date: string) =>
  moment(date, "YYYYMMDD").fromNow().replace("a ", "1 ").replace(" ago", "");

export const formattedPublishedAt = (date: string) => moment(date).format("ll");
