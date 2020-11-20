import { makeUserFake } from "../users/models";
import { UserRepositoryHashMap } from "../users/repositories/user-repository.fake";

describe("hash map respository", () => {
  it("searches entities by keys", async () => {
    const usersRespository = new UserRepositoryHashMap();
    const usernames = ["hi", "hey", "hello", "sup", "yo"];

    for (const username of usernames) {
      await usersRespository.add([makeUserFake({ username })]);
    }

    const query1 = "h";
    const results1 = await usersRespository.search(query1, ["username"]);
    expect(results1).toHaveLength(3);
    for (const result of results1) {
      expect(result.username).toContainEqual(query1);
    }

    const query2 = "y";
    const results2 = await usersRespository.search(query2, ["username"]);
    expect(results2).toHaveLength(2);
    for (const result of results2) {
      expect(result.username).toContainEqual(query2);
    }
    const query3 = "z";
    const results3 = await usersRespository.search(query3, ["username"]);
    expect(results3).toHaveLength(0);
  });
});
