const { makeMovieTvEntity } = require("../__test__/movie-tv-entity");

const f = makeMovieTvEntity;

describe("list item", () => {
  it("must have a valid id", () => {
    expect(() => f({ id: " " })).toThrow();
    expect(() => f({ id: "invalid" })).toThrow();
    expect(() => f({ id: "23456789" })).toThrow();
  });
  it("must have a valid TMDb media id", () => {
    expect(() =>
      f({ foreignIds: { tmdbMediaType: "movie", tmdbId: " " } })
    ).toThrow();
    expect(() =>
      f({ foreignIds: { tmdbMediaType: "movie", tmdbId: "invalid" } })
    ).toThrow();
    expect(() =>
      f({ foreignIds: { tmdbMediaType: "movie", tmdbId: 23 } })
    ).not.toThrow();
    expect(() =>
      f({ foreignIds: { tmdbMediaType: "movie", tmdbId: "23" } })
    ).not.toThrow();
  });
  it("must have a valid TMDb media type", () => {
    expect(() =>
      f({ foreignIds: { tmdbId: "23", tmdbMediaType: " " } })
    ).toThrow();
    expect(() =>
      f({ foreignIds: { tmdbId: "23", tmdbMediaType: "invalid" } })
    ).toThrow();
    expect(() =>
      f({ foreignIds: { tmdbId: "23", tmdbMediaType: "movie" } })
    ).not.toThrow();
    expect(() =>
      f({ foreignIds: { tmdbId: "23", tmdbMediaType: "tv" } })
    ).not.toThrow();
  });
});
