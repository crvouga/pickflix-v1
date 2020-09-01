const { makeId } = require("../../id");

const { makeFakeMediaList } = require("../__test__/movie-tv-list");

const longText = new Array(500).fill("a").join("");

describe("list", () => {
  it("must have at least one user id", () => {
    expect(() => makeFakeMediaList({ userIds: [] })).toThrow();
  });

  it("must have valid user ids", () => {
    expect(() =>
      makeFakeMediaList({ userIds: [makeId(), "invalid", makeId()] })
    ).toThrow();
  });

  it("must have valid item ids", () => {
    expect(() => makeFakeMediaList({ itemIds: ["invalid"] })).toThrow();
  });

  it("must have a title", () => {
    expect(() => makeFakeMediaList({ title: "" })).toThrow();
  });

  it("title can NOT be too long", () => {
    expect(() => makeFakeMediaList({ description: longText })).toThrow();
  });

  it("description can NOT be too long", () => {
    expect(() => makeFakeMediaList({ description: longText })).toThrow();
  });
});
