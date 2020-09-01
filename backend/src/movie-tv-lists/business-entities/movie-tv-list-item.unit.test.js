const { makeMovieTvListItem } = require("../__test__/movie-tv-list-item");

describe("list item", () => {
  it("must have a valid id", () => {
    expect(() => makeMovieTvListItem({ id: " " })).toThrow();
    expect(() => makeMovieTvListItem({ id: "invalid" })).toThrow();
    expect(() => makeMovieTvListItem({ id: "23456789" })).toThrow();
  });
  it("must have a valid TMDb media id", () => {
    expect(() => makeMovieTvListItem({ tmdbMediaId: " " })).toThrow();
    expect(() => makeMovieTvListItem({ tmdbMediaId: "a" })).toThrow();
    expect(() => makeMovieTvListItem({ tmdbMediaId: "42" })).not.toThrow();
  });
  it("must have a valid TMDb media type", () => {
    expect(() => makeMovieTvListItem({ tmdbMediaType: " " })).toThrow();
    expect(() => makeMovieTvListItem({ tmdbMediaType: "invalid" })).toThrow();
    expect(() => makeMovieTvListItem({ tmdbMediaType: "movie" })).not.toThrow();
    expect(() => makeMovieTvListItem({ tmdbMediaType: "tv" })).not.toThrow();
  });
});
