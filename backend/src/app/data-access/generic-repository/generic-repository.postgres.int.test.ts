import { PostgresDatabaseTest } from "../database.postgres";
import {
  FooRepositoryPostgres,
  makeFooArbitrary,
} from "./foo-repository.postgres";
import { range } from "ramda";
import { PaginationOptions } from "../../pagination";

const buildFooRepositoryPostgres = async () => {
  const database = new PostgresDatabaseTest();
  const repository = new FooRepositoryPostgres(database);
  await database.clearTables();
  await repository.initializeTables();
  return repository;
};

const pagination: PaginationOptions = {
  page: 1,
  pageSize: 20,
};

describe("generic postgres repository", () => {
  it("returns no entities when spec is empty", async () => {
    const repository = await buildFooRepositoryPostgres();

    const foo = makeFooArbitrary();

    await repository.add([foo]);

    const found = await repository.find([]);
    const count = await repository.count([]);

    expect(found).toHaveLength(0);
    expect(count).toEqual(0);
  });

  it("adds and finds entities", async () => {
    const repository = await buildFooRepositoryPostgres();

    const foo = makeFooArbitrary();

    const before = await repository.find(
      [
        {
          id: foo.id,
        },
      ],
      {
        pagination,
      }
    );

    await repository.add([foo]);

    const after = await repository.find([
      {
        id: foo.id,
      },
    ]);

    expect(before).toHaveLength(0);
    expect(after).toHaveLength(1);
    expect(after).toContainEqual(foo);
  });

  it("counts  entities", async () => {
    const repository = await buildFooRepositoryPostgres();

    const expected = 10;

    for (let i = 0; i < expected; i++) {
      await repository.add([makeFooArbitrary({ favoriteColor: "blue" })]);
    }

    const actual = await repository.count([
      {
        favoriteColor: "blue",
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("counts entities by spec", async () => {
    const repository = await buildFooRepositoryPostgres();

    const expectedRedCount = 36;
    const expectedBarCount = 24;
    const expectedCount = expectedRedCount + expectedBarCount;

    for (let i = 0; i < expectedRedCount; i++) {
      await repository.add([
        makeFooArbitrary({
          favoriteColor: "red",
        }),
      ]);
    }

    for (let i = 0; i < expectedBarCount; i++) {
      await repository.add([
        makeFooArbitrary({
          name: "bar",
          //ensure favoriteColor is NOT red
          favoriteColor: "blue",
        }),
      ]);
    }

    const actualRedCount = await repository.count([
      {
        favoriteColor: "red",
      },
    ]);

    const actualBarCount = await repository.count([
      {
        name: "bar",
      },
    ]);

    const actualCount = await repository.count([
      {
        name: "bar",
      },
      {
        favoriteColor: "red",
      },
    ]);

    expect(actualRedCount).toEqual(expectedRedCount);
    expect(actualBarCount).toEqual(expectedBarCount);
    expect(actualCount).toEqual(expectedCount);
  });

  it("full text searches", async () => {
    const repository = await buildFooRepositoryPostgres();

    const names = ["hi", "hey", "hello", "sup", "yo"];

    const foos = names.map((name, index) =>
      makeFooArbitrary({
        id: String(index),
        name: name,
      })
    );

    await repository.add(foos);

    const query1 = "h";
    const results1 = await repository.search(query1, ["name"], {
      pagination,
    });
    expect(results1).toHaveLength(3);
    for (const result of results1) {
      expect(result.name).toContainEqual(query1);
    }

    const query2 = "y";
    const results2 = await repository.search(query2, ["name"], {
      pagination,
    });
    expect(results2).toHaveLength(2);
    for (const result of results2) {
      expect(result.name).toContainEqual(query2);
    }
    const query3 = "z";
    const results3 = await repository.search(query3, ["name"], {
      pagination,
    });
    expect(results3).toHaveLength(0);
  });

  it("adds and removed entities", async () => {
    const repository = await buildFooRepositoryPostgres();

    const foo = makeFooArbitrary();

    await repository.add([foo]);

    const before = await repository.find([{ id: foo.id }], {
      pagination,
    });

    await repository.remove([{ id: foo.id }]);

    const after = await repository.find([{ id: foo.id }], {
      pagination,
    });

    expect(before).toHaveLength(1);
    expect(before).toContainEqual(foo);
    expect(after).toHaveLength(0);
  });

  it("adds and updates entities", async () => {
    const repository = await buildFooRepositoryPostgres();

    const foo = makeFooArbitrary({
      favoriteColor: "blue",
    });

    await repository.add([foo]);

    const [before] = await repository.find([{ id: foo.id }], {
      pagination,
    });

    await repository.update(foo.id, { favoriteColor: "red" });

    const [after] = await repository.find([{ id: foo.id }], {
      pagination,
    });

    expect(before.favoriteColor).toEqual("blue");
    expect(after.favoriteColor).toEqual("red");
  });

  it("counts and finds entities by spec", async () => {
    const repository = await buildFooRepositoryPostgres();

    const a = makeFooArbitrary({
      id: "1",
      favoriteColor: "blue",
      name: "foo",
    });
    const b = makeFooArbitrary({
      id: "2",
      name: "bar",
      favoriteColor: "blue",
    });
    const c = makeFooArbitrary({
      id: "3",
      favoriteColor: "red",
      name: "foo",
    });

    await repository.add([a, b, c]);

    const result1 = await repository.find([], {
      pagination,
    });

    expect(result1).toHaveLength(0);

    const result2 = await repository.find([{ favoriteColor: "blue" }], {
      pagination,
    });
    expect(await repository.count([{ favoriteColor: "blue" }])).toEqual(2);
    expect(result2).toContainEqual(a);
    expect(result2).toContainEqual(b);
    expect(result2).not.toContainEqual(c);

    const result3 = await repository.find([{ favoriteColor: "red" }], {
      pagination,
    });
    expect(await repository.count([{ favoriteColor: "red" }])).toEqual(1);
    expect(result3).not.toContainEqual(a);
    expect(result3).not.toContainEqual(b);
    expect(result3).toContainEqual(c);

    const result4 = await repository.find(
      [{ favoriteColor: "red" }, { id: b.id }],
      {
        pagination,
      }
    );
    expect(
      await repository.count([{ favoriteColor: "red" }, { id: b.id }])
    ).toEqual(2);
    expect(result4).not.toContainEqual(a);
    expect(result4).toContainEqual(b);
    expect(result4).toContainEqual(c);

    const result5 = await repository.find(
      [{ favoriteColor: "blue", name: "foo" }],
      {
        pagination,
      }
    );
    expect(
      await repository.count([{ favoriteColor: "blue", name: "foo" }])
    ).toEqual(1);
    expect(result5).toContainEqual(a);
    expect(result5).not.toContainEqual(b);
    expect(result5).not.toContainEqual(c);

    const result6 = await repository.find(
      [{ id: a.id }, { id: b.id }, { id: c.id }],
      {
        pagination,
      }
    );
    expect(
      await repository.count([{ id: a.id }, { id: b.id }, { id: c.id }])
    ).toEqual(3);
    expect(result6).toContainEqual(a);
    expect(result6).toContainEqual(b);
    expect(result6).toContainEqual(c);
  });

  it("adds and removes entities by non id spec", async () => {
    const repository = await buildFooRepositoryPostgres();

    const a = makeFooArbitrary({
      id: "1",
      favoriteColor: "blue",
      name: "foo",
    });
    const b = makeFooArbitrary({
      id: "2",
      name: "bar",
      favoriteColor: "yellow",
    });
    const c = makeFooArbitrary({
      id: "3",
      favoriteColor: "red",
      name: "foo",
    });

    await repository.add([a, b, c]);

    const before = await repository.find([
      {
        id: a.id,
      },
      {
        id: b.id,
      },
      {
        id: c.id,
      },
    ]);

    await repository.remove([
      { favoriteColor: "blue" },
      { favoriteColor: "yellow" },
    ]);

    const after = await repository.find([
      {
        id: a.id,
      },
      {
        id: b.id,
      },
      {
        id: c.id,
      },
    ]);

    expect(before).toContainEqual(a);
    expect(before).toContainEqual(b);
    expect(before).toContainEqual(c);
    expect(before).toHaveLength(3);
    //
    expect(after).toContainEqual(c);
    expect(after).toHaveLength(1);
  });
});
