import { schema } from "../../redux/query/normalize";

export type Person = {};

export type MovieCredits = {
  cast: Person[];
  crew: Person[];
};

export type Movie = {
  credits: MovieCredits;
};

export enum EntityKeys {
  movie = "movie",
  person = "person",
}

export const personSchema: schema.Entity<Person> = new schema.Entity(
  EntityKeys.person,
  {}
);

export const movieSchema: schema.Entity<Movie> = new schema.Entity(
  EntityKeys.movie,
  {
    credits: {
      cast: new schema.Array(personSchema),
      crew: new schema.Array(personSchema),
    },
  }
);
