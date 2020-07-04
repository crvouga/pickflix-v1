import { camelizeKeys, decamelizeKeys } from "humps";
import * as R from "ramda";

export const fetchCamelizedJSON = (url, config = {}) => {
  const controller = new AbortController();

  const promise = fetch(url, {
    ...config,
    signal: controller.signal,
  })
    .then((response) => response.json())
    .then(camelizeKeys)
    .catch((error) => error);

  // lets react-query to cancel request
  promise.cancel = () => {
    controller.abort();
  };

  return promise;
};

export const queryParamtersToString = R.pipe(
  decamelizeKeys,
  R.map(R.when(Array.isArray, R.join(","))),
  R.toPairs,
  R.map(R.join("=")),
  R.join("&"),
  R.prepend("?"),
  R.join("")
);

export const makeURL = (root, endpoint, query = {}) =>
  R.join("", [root, endpoint, queryParamtersToString(query)]);

const quotient = R.curry((x1, x2) => Math.floor(x1 / x2));

export const minutesToHoursAndMinutes = R.pipe(
  parseInt,
  R.juxt([
    R.pipe(quotient(R.__, 60), (x) => (x > 0 ? `${x}h` : "")),
    R.pipe(R.modulo(R.__, 60), (x) => (x > 0 ? `${x}m` : "")),
  ]),
  R.join(" ")
);

export const rescale = R.curry(
  ({ from: [start1, stop1], to: [start2, stop2] }, n) =>
    ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
);

export const voteAverageToFiveStarRating = rescale({
  from: [0, 10],
  to: [0, 5],
});

export const numberToNumberWithCommas = R.pipe(
  R.toString,
  R.reverse,
  R.splitEvery(3),
  R.join(","),
  R.reverse
);

export const releaseDateToYear = R.pipe(R.split("-"), R.head);

export const creditsToCreditsByDepartment = R.pipe(
  R.juxt([R.propOr([], "cast"), R.propOr([], "crew")]),
  ([cast, crew]) =>
    R.groupBy(
      R.prop("department"),
      R.union(crew, R.map(R.assoc("department", "Acting"), cast))
    )
);

export const videoKeyToURL = (key) => `https://www.youtube.com/embed/${key}`;

export const videoKeyToThumbnailURL = (key) =>
  `https://i.ytimg.com/vi/${key}/maxresdefault.jpg`;

export const captialize = R.pipe(
  R.toString,
  R.juxt([R.pipe(R.head, R.toUpper), R.tail]),
  R.join("")
);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const numberDateToWordDate = (date) => {
  if (date) {
    const dt = new Date(date);
    return (
      monthNames[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear()
    );
  } else {
    return null;
  }
};

export const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

export const getPositions = (query) => {
  const element = document.querySelector(query);

  if (!element) {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  const boundingClientRect = element.getBoundingClientRect();
  const clientHeight = element.clientHeight;
  const clientWidth = element.clientWidth;

  const top = window.scrollY + boundingClientRect.top;
  const bottom = top + clientHeight;
  const left = window.scrollX + boundingClientRect.left;
  const right = left + clientWidth;

  return { top, bottom, left, right };
};

export const getElementPositions = (element) => {
  if (!element) {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  const boundingClientRect = element.getBoundingClientRect();
  const clientHeight = element.clientHeight;
  const clientWidth = element.clientWidth;

  const top = window.scrollY + boundingClientRect.top;
  const bottom = top + clientHeight;
  const left = window.scrollX + boundingClientRect.left;
  const right = left + clientWidth;

  return { top, bottom, left, right, boundingClientRect };
};

export const getElementBottom = (elementOrNull) => {
  const element = elementOrNull || {
    getBoundingClientRect: () => {},
  };
  const rect = element.getBoundingClientRect() || {};
  return rect.bottom || 0;
};
